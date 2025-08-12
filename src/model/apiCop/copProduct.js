import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const copProductSchema = new mongoose.Schema({
    idProduct: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true,
    collection: 'API_COP_PRODUCTS' // Especificamos el nombre de la colección
});

export default mongoose.model('CopProduct', copProductSchema); 