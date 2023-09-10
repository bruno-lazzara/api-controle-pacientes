import express from 'express';

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({ titulo: 'API para controle de pacientes para psicólogos' });
    });

    app.use(
        express.json()
    );
};

export default routes;