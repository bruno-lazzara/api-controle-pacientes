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
}

export default PacientesController;