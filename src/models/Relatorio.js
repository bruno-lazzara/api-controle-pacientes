import mongoose from 'mongoose';

const relatorioSchema = new mongoose.Schema({
    id: {
        type: String
    },
},
{
    versionKey: false,
    strict: false
});

const relatorios = mongoose.model('relatorios', relatorioSchema);

export default relatorios;