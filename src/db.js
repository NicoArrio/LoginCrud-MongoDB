import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://nickgrayson669:A7971BJ28Nico@proyect0.okpmhoq.mongodb.net/myfirstdb?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(">>>DB is connected");
    } catch (error) {
        console.log(error);
        process.exit(1); // Detener el proceso si hay un error
    }
};