import express from 'express';
import UsuariosController from '../controllers/usuariosController.js';
import AuthService from '../services/authService.js';

const router = express.Router();

router
    .post('/usuarios', AuthService.authorize, UsuariosController.cadastrarUsuario)
    .post('/usuarios/autenticar', UsuariosController.autenticar);

export default router;