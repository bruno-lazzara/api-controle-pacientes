import parametros from '../models/Parametro.js';

class ParametrosController {
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
}

export default ParametrosController;