import mongoose from 'mongoose';

const copTierSchema = new mongoose.Schema({
    idTier: {
        type: String,
        required: [true, 'El idTier es requerido'],
        unique: true,
        trim: true
    },
    sku: {
        type: String,
        required: [true, 'El SKU es requerido'],
        trim: true
    },
    displayName: {
        type: String,
        required: [true, 'El nombre de visualización es requerido'],
        trim: true
    },
    supportedUsers: {
        type: Number,
        required: [true, 'El número de usuarios soportados es requerido'],
        min: [1, 'El número mínimo de usuarios soportados es 1']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    collection: 'API_COP_TIERS'
});

export default mongoose.model('CopTier', copTierSchema); 