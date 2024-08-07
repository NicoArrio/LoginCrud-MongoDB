import mongoose from 'mongoose';


export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://nickgrayson669:A7971BJ28Nico@proyect0.okpmhoq.mongodb.net/myfirstdb?retryWrites=true&w=majority', {});
        console.log(">>>DB is connected");
    } catch (error) {
        console.error('COULD NOT CONNECT TO DATABASE:', error.message);
    }
};

