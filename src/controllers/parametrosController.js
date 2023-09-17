import parametros from '../models/Parametro.js';

class ParametrosController {
    static buscarParametros = async (req, res) => {
        try {
            const lista = await parametros.find();
            res.status(200).send(lista);
        } catch (err) {
            res.status(500).send({ message: 'Erro ao bucar parâmetros' });
        }
    };

    static buscarParametroPorId = async (req, res) => {
        try {
            const { id } = req.params;

            const parametro = await parametros.findById(id);
            if (parametro) {
                res.status(200).send(parametro);
            } else {
                res.status(404).send({ message: 'Parâmetro não encontrado' });
            }
        } catch (err) {
            res.status(500).send({ message: 'Erro ao buscar parâmetro' });
        }
    };

    static buscarParametroPorNome = async (req, res) => {
        try {
            const { nome } = req.params;
            const parametro = await parametros.findOne({
                nome: nome
            });
            res.status(200).send(parametro);
        } catch (err) {
            res.status(500).send({ message: 'Erro ao buscar parâmetro' });
        }
    };

    static adicionarParametro = async (req, res) => {
        try {
            let parametro = new parametros(req.body);
            const resultado = await parametro.save();
            res.status(201).send(resultado.toJSON());
        } catch (err) {
            res.status(500).send({ message: 'Erro ao cadastrar parâmetro' });
        }
    };

    static atualizarValorParametro = async (req, res) => {
        try {
            const { id } = req.params;
            const valor = req.body.valor;

            const atualizado = await parametros.findByIdAndUpdate(id, {
                $set: {
                    valor: valor
                }
            });

            if (atualizado) {
                res.status(200).send({ message: 'Parâmetro atualizado com sucesso' });
            } else {
                res.status(404).send({ message: 'Parâmetro não encontrado' });
            }
        } catch (err) {
            res.status(500).send({ message: 'Erro ao atualizar parâmetro' });
        }
    };
}

export default ParametrosController;