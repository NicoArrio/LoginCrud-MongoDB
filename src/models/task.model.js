import mongoose from 'mongoose';

//esquema para las tareas 
const taskSachema = new mongoose.Schema({
    title: {
        type: String,
        required: true, //dato obligatorio
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now, //fecha actual sino se coloca nada
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId, //typo special of object mongoose (ID mongoDB)
        ref: 'User', //referncia al modelo User
        required: true,
    }
}, {
    timestamps: true //agrega al documento: createdAt, updatedAt
});

export default mongoose.model('Task', taskSachema);