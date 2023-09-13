import express from 'express';
import PacientesController from '../controllers/PacientesController.js';
import AuthService from '../services/authService.js';

const router = express.Router();

router
    .get('/pacientes', AuthService.authorize, PacientesController.listarPacientes)
    .get('/pacientes/:mes/:ano', AuthService.authorize, PacientesController.listarPacientesPorMesAnoSessao)
    .get('/pacientes/semsessao/:mes/:ano', AuthService.authorize, PacientesController.listarPacientesSemSessao)
    .get('/pacientes/:id', AuthService.authorize, PacientesController.listarPacientePorId)
    .post('/pacientes', AuthService.authorize, PacientesController.cadastrarPaciente)
    .put('/pacientes/:idPaciente/:idSessao', AuthService.authorize, PacientesController.atualizarSessaoPaciente);

export default router;