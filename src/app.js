import express from 'express';
import db from './config/dbConnect.js';
import routes from './routes/index.js';
import cors from 'cors';

db.on('error', console.log.bind(console, 'Erro de conexão'));
db.once('open', () => {
    console.log(`conexão com o banco feita com sucesso - ${db.db.databaseName} - ${process.env.DB}`);
});

const app = express();

app.use(express.json());
app.use(cors());

routes(app);

// app.use(manipulador404);

// Middleware for error handling
// app.use(manipuladorDeErros);

export default app;