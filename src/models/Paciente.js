import mongoose from 'mongoose';

const semanaSchema = {
    type: String
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
    valor_secao: {
        type: Number,
        required: [true, 'O valor da seção é obrigatório']
    },
    desconta_imposto: {
        type: Boolean,
        default: false
    },
    sessoes: [sessaoSchema]
},
{
    versionKey: false
});

const pacientes = mongoose.model('pacientes', pacienteSchema);

export default pacientes;