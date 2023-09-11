import { pacientes } from '../models/index.js';

class PacientesController {
    static listarPacientes = async (req, res) => {
        try {
            const listaPacientes = await pacientes.find();
            res.status(200).send(listaPacientes);
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: 'Erro ao listar pacientes' });
        }
    };

    static listarPacientePorId = async (req, res) => {
        try {
            const { id } = req.params;
            const paciente = await pacientes.findById(id);
            res.status(200).send(paciente);
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: 'Erro ao listar paciente' });
        }
    };

    static cadastrarPaciente = async (req, res) => {
        try {
            let paciente = new pacientes(req.body);
            const resultado = await paciente.save();
            res.status(201).send(resultado.toJSON());
        } catch (err) {
            console.log(err);
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
            
            res.status(200).send(listaPacientes);
        } catch (err) {
            res.status(500).send({ message: 'Erro ao buscar pacientes' });
        }
    };
}

export default PacientesController;