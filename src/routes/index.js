import express from 'express';
import pacientesRoutes from './pacientesRoutes.js';

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({ titulo: 'API para controle de pacientes para psicólogos' });
    });

    app.use(
        express.json(),
        pacientesRoutes
    );
};

export default routes;