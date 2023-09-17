import express from 'express';
import AuthService from '../services/authService.js';
import ParametrosController from '../controllers/parametrosController.js';

const router = express.Router();

router
    .get('/parametros', AuthService.authorize, ParametrosController.buscarParametros)
    .get('/parametros/porId/:id', AuthService.authorize, ParametrosController.buscarParametroPorId)
    .get('/parametros/:nome', AuthService.authorize, ParametrosController.buscarParametroPorNome)
    .put('/parametros/:id', AuthService.authorize, ParametrosController.atualizarValorParametro)
    .post('/parametros', AuthService.authorize, ParametrosController.adicionarParametro);

export default router;