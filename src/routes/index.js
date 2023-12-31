import express from 'express';
import pacientesRoutes from './pacientesRoutes.js';
import usuariosRoutes from './usuariosRoutes.js';
import parametrosRoutes from './parametrosRoutes.js';

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({ titulo: 'API para controle de pacientes para psicólogos' });
    });

    app.use(
        express.json(),
        pacientesRoutes,
        usuariosRoutes,
        parametrosRoutes
    );
};

export default routes;