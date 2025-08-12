import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const copRegionSchema = new mongoose.Schema({
    idRegion: {
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
    collection: 'API_COP_REGIONS'
});

export default mongoose.model('CopRegion', copRegionSchema); 