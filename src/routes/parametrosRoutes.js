import express from 'express';
import AuthService from '../services/authService.js';
import ParametrosController from '../controllers/parametrosController.js';

const router = express.Router();

router
    .get('/parametros/:nome', AuthService.authorize, ParametrosController.buscarParametroPorNome)
    .post('/parametros', AuthService.authorize, ParametrosController.adicionarParametro);

export default router;