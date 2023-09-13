import mongoose from 'mongoose';

const parametroSchema = new mongoose.Schema({
    id: {
        type: String
    },
    nome: {
        type: String,
        required: [true, 'O nome do parâmetro é obrigatório']
    },
    valor: {
        type: Number,
        required: [true, 'O valor do parâmetro é obrigatório']
    }
},
{
    versionKey: false
});

const parametros = mongoose.model('parametros', parametroSchema);

export default parametros;