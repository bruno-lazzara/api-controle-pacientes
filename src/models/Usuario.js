import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
    id: {
        type: String
    },
    nome: {
        type: String,
        required: [true, 'O nome do usuário é obrigatório']
    },
    email: {
        type: String,
        required: [true, 'O e-mail do usuário é obrigatório']
    },
    senha: {
        type: String,
        required: [true, 'A senha do usuário é obrigatória']
    }
},
{
    versionKey: false
});

const usuarios = mongoose.model('usuarios', usuarioSchema);

export default usuarios;