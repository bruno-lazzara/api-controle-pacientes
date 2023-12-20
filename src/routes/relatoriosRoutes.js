import express from 'express';
import RelatoriosController from '../controllers/relatoriosController.js';
import AuthService from '../services/authService.js';

const router = express.Router();

router
    .post('/relatorios/novo/:mes/:ano', AuthService.authorize, RelatoriosController.cadastrarRelatorio);

export default router;