import parametros from '../models/Parametro.js';
import { pacientes } from '../models/index.js';

class PacientesController {
    static listarPacientes = async (req, res) => {
        try {
            const listaPacientes = await pacientes.find();
            res.status(200).send(listaPacientes);
        } catch (err) {
            res.status(500).send({ message: 'Erro ao listar pacientes' });
        }
    };

    static listarPacientePorId = async (req, res) => {
        try {
            const { id } = req.params;
            const paciente = await pacientes.findById(id);
            res.status(200).send(paciente);
        } catch (err) {
            res.status(500).send({ message: 'Erro ao listar paciente' });
        }
    };

    static cadastrarPaciente = async (req, res) => {
        try {
            let paciente = new pacientes(req.body);
            const resultado = await paciente.save();
            res.status(201).send(resultado.toJSON());
        } catch (err) {
            res.status(500).send({ message: 'Erro ao cadastrar paciente' });
        }
    };

    static atualizarSessaoPaciente = async (req, res) => {
        try {
            const { idPaciente, idSessao } = req.params;
            const sessaoAtualizar = req.body.status_semana;

            const atualizado = await pacientes.findOneAndUpdate({
                '_id': idPaciente,
                'sessoes._id': idSessao
            }, {
                '$set': {
                    'sessoes.$.status_semana': sessaoAtualizar
                }
            });

            if (atualizado) {
                res.status(200).send({ message: 'Sessão atualizada' });
            } else {
                res.status(404).send({ message: 'Paciente ou sessão não encontrados' });
            }

        } catch (err) {
            res.status(500).send({ message: 'Erro ao atualizar sessão' });
        }
    };

    static listarPacientesPorMesAnoSessao = async (req, res) => {
        try {
            const { mes, ano } = req.params;

            const listaPacientes = await pacientes.aggregate([
                {
                    $match: {
                        'sessoes': {
                            $elemMatch: {
                                'mes': Number(mes),
                                'ano': Number(ano)
                            }
                        }
                    }
                },
                {
                    $project: {
                        '_id': 1,
                        'nome': 1,
                        'valor_secao': 1,
                        'desconta_imposto': 1,
                        'sessoes': {
                            $filter: {
                                input: '$sessoes',
                                as: 'sessao',
                                cond: {
                                    $and: [
                                        { $eq: ['$$sessao.mes', Number(mes)] },
                                        { $eq: ['$$sessao.ano', Number(ano)] }
                                    ]
                                }
                            }
                        }
                    }
                }
            ]);

            const paramImposto = await parametros.findOne({
                nome: 'Imposto'
            });

            listaPacientes.forEach((paciente) => {
                paciente.sessoes.forEach((sessao) => {
                    let totalPago = 0;
                    let totalDevido = 0;
                    let valorSecao = paciente.valor_secao;
                    if (paciente.desconta_imposto) {
                        valorSecao = valorSecao * (1 - paramImposto.valor);
                    }

                    totalPago += sessao.status_semana?.semana_1 === 'PAGO' ? valorSecao : 0;
                    totalPago += sessao.status_semana?.semana_2 === 'PAGO' ? valorSecao : 0;
                    totalPago += sessao.status_semana?.semana_3 === 'PAGO' ? valorSecao : 0;
                    totalPago += sessao.status_semana?.semana_4 === 'PAGO' ? valorSecao : 0;
                    totalPago += sessao.status_semana?.semana_5 === 'PAGO' ? valorSecao : 0;

                    totalDevido += (sessao.status_semana?.semana_1 === 'TEVE' || sessao.status_semana?.semana_1 === 'NO SHOW') ? paciente.valor_secao : 0;
                    totalDevido += (sessao.status_semana?.semana_2 === 'TEVE' || sessao.status_semana?.semana_2 === 'NO SHOW') ? paciente.valor_secao : 0;
                    totalDevido += (sessao.status_semana?.semana_3 === 'TEVE' || sessao.status_semana?.semana_3 === 'NO SHOW') ? paciente.valor_secao : 0;
                    totalDevido += (sessao.status_semana?.semana_4 === 'TEVE' || sessao.status_semana?.semana_4 === 'NO SHOW') ? paciente.valor_secao : 0;
                    totalDevido += (sessao.status_semana?.semana_5 === 'TEVE' || sessao.status_semana?.semana_5 === 'NO SHOW') ? paciente.valor_secao : 0;

                    sessao.valor_total_pago = totalPago;
                    sessao.valor_total_devido = totalDevido;
                });
            });

            res.status(200).send(listaPacientes);
        } catch (err) {
            res.status(500).send({ message: 'Erro ao buscar pacientes' });
        }
    };

    static listarPacientesSemSessao = async (req, res) => {
        try {
            const { mes, ano } = req.params;

            const listaPacientes = await pacientes.aggregate([
                {
                    $match: {
                        'sessoes': {
                            $not: {
                                $elemMatch: {
                                    'mes': Number(mes),
                                    'ano': Number(ano)
                                }
                            }
                        }
                    }
                },
                {
                    $project: {
                        '_id': 1,
                        'nome': 1
                    }
                }
            ]);

            res.status(200).send(listaPacientes);
        } catch (err) {
            res.status(500).send({ message: 'Erro ao buscar pacientes' });
        }
    };

    static adicionarSessao = async (req, res) => {
        try {
            const { pacienteId, mes, ano } = req.body;

            const paciente = await pacientes.findById(pacienteId);

            if (!paciente) {
                throw new Error('Paciente não encontrado');
            }

            paciente.sessoes.push({
                mes: mes,
                ano: ano,
                status_semana: {
                    semana_1: ''
                }
            });

            await paciente.save();

            res.status(200).send({ message: 'Nova sessão adicionada com sucesso' });
        } catch (err) {
            res.status(500).send({ message: 'Erro ao adicionar sessão' });
        }
    };

    static atualizarPaciente = async (req, res) => {
        try {
            const { id } = req.params;
            const data = req.body;

            const atualizado = await pacientes.findByIdAndUpdate(id, {
                $set: {
                    nome: data.nome,
                    valor_secao: data.valor_secao,
                    desconta_imposto: data.desconta_imposto
                }
            });

            if (atualizado) {
                res.status(200).send({ message: 'Paciente atualizado' });
            } else {
                res.status(404).send({ message: 'Paciente não encontrado' });
            }
        } catch (err) {
            res.status(500).send({ message: 'Erro ao atualizar paciente' });
        }
    };

    static apagarSessaoPaciente = async (req, res) => {
        try {
            const { idPaciente, idSessao } = req.params;

            const paciente = await pacientes.findById(idPaciente);
            if (!paciente) {
                return res.status(404).send({ message: 'Paciente não encontrado' });
            }

            paciente.sessoes.pull(idSessao);

            await paciente.save();

            res.status(200).send({ message: 'Sessão removida com sucesso' });
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: 'Erro ao remover sessão' });
        }
    };
}

export default PacientesController;