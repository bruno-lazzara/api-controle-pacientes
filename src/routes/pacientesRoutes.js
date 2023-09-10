import express from 'express';
import PacientesController from '../controllers/PacientesController.js';

const router = express.Router();

router
    .get('/pacientes', PacientesController.listarPacientes)
    .get('/pacientes/:id', PacientesController.listarPacientePorId)
    .post('/pacientes', PacientesController.cadastrarPaciente);
// .put('/pacientes/:id', PacientesController.atualizarPaciente)
// .delete('/pacientes/:id', PacientesController.excluirPaciente);

export default router;