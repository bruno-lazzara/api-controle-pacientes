import express from 'express';
import UsuariosController from '../controllers/usuariosController.js';

const router = express.Router();

router
    .post('/usuarios', UsuariosController.cadastrarUsuario)
    .post('/usuarios/autenticar', UsuariosController.autenticar);

export default router;