import md5 from 'md5';
import { usuarios } from '../models/index.js';
import jwt from 'jsonwebtoken';

const key = process.env.SALT_KEY;

class UsuariosController {
    static cadastrarUsuario = async (req, res) => {
        try {
            let novoUsuario = new usuarios({
                nome: req.body.nome,
                email: req.body.email,
                senha: md5(req.body.senha + key)
            });
            await novoUsuario.save();
            res.status(201).send({ message: 'Usuário cadastrado com sucesso' });
        } catch (err) {
            res.status(500).send({ message: 'Erro ao cadastrar usuário' });
        }
    };

    static autenticar = async (req, res) => {
        try {
            const usuario = await usuarios.findOne({
                email: req.body.email,
                senha: md5(req.body.senha + key)
            });

            if (usuario) {
                const token = jwt.sign({
                    id: usuario._id,
                    email: usuario.email,
                    name: usuario.nome
                }, key, { expiresIn: '1h' });
                
                res.status(200).send({
                    token: token,
                    data: {
                        email: usuario.email,
                        name: usuario.nome
                    }
                });
            } else {
                res.status(401).send('Não autenticado');
            }
        } catch (err) {
            res.status(500).send({ message: 'Erro ao autenticar usuário' });
        }
    };
}

export default UsuariosController;