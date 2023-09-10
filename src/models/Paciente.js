import mongoose from 'mongoose';

const semanaSchema = {
    type: String,
    enum: {
        values: ['NÃO TEVE', 'TEVE', 'NO SHOW', 'PAGO'],
        message: 'O valor \'{VALUE}\' não é permitido'
    }
};

const sessaoSchema = new mongoose.Schema({
    mes: {
        type: Number,
        required: [true, 'O mês da sessão é obrigatório']
    },
    ano: {
        type: Number,
        required: [true, 'O ano da sessão é obrigatório']
    },
    status_semana: {
        semana_1: semanaSchema,
        semana_2: semanaSchema,
        semana_3: semanaSchema,
        semana_4: semanaSchema,
        semana_5: semanaSchema
    }
});

const pacienteSchema = new mongoose.Schema({
    id: {
        type: String
    },
    nome: {
        type: String,
        required: [true, 'O nome do paciente é obrigatório']
    },
    sessoes: [sessaoSchema]
},
{
    versionKey: false
});

const pacientes = mongoose.model('pacientes', pacienteSchema);

export default pacientes;