import mongoose from "mongoose";


//esto es la estructura de como queremos q se vea en mongoDB
//el mongoose.Schema es una INSTANCIA y x eso se agrega el new 
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true, // requiere q siempre le pase este dato
        trim: true, //limpia los espacios en blanco
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true, //tiene que ser unico este dato(email)
    },
    password:{
        type: String,
        required: true,
    },
},{ // aniado otro obj
    timestamps: true //fecha de creacion
})

export default mongoose.model('User', userSchema)
/** 
 * - interactuar con la db con los metodos
 * - todos van a ser un modelo llamado user
 * - basado en el esquema q eh creado, le voy a decir "user" 
 * al modelo, y con ese modelo, puedo hacer consultas (CRUD)
*/
