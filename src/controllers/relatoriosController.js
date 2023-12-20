import { relatorios } from '../models/index.js';

class RelatoriosController {
    static cadastrarRelatorio = async (req, res) => {
        try {
            const { mes, ano } = req.params;
            const pacientes = req.body;

            let relatorioObj = {
                mes: mes,
                ano: ano,
                pacientes: pacientes
            };

            const relatorioExistente = await relatorios.findOne({
                'mes': mes,
                'ano': ano
            });

            if (relatorioExistente) {
                res.status(400).send({ message: 'Relatório já existente para o mês/ano informado' });
                return;
            }

            let relatorio = new relatorios(relatorioObj);
            const resultado = await relatorio.save();
            res.status(201).send(resultado.toJSON());
        } catch (err) {
            res.status(500).send({ message: 'Erro ao cadastrar relatório' });
        }
    };
}

export default RelatoriosController;