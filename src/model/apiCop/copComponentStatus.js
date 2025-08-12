import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const copComponentStatusSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'El productName es requerido'],
        trim: true
    },
    transactionId: {
        type: String,
        required: [true, 'El transactionId es requerido'],
        default: () => uuidv4()
    },
    idProductInstance: {
        type: String,
        required: [true, 'El idProductInstance es requerido'],
        ref: 'CopBizagiProduct'
    },
    deployStatus: {
        type: String,
        enum: ['IN_QUEUE', 'CREATED', 'UPDATING', 'ERROR', 'INFRASTRUCTURE_ERROR', 'CONFIGURATION_ERROR'],
        default: 'IN_QUEUE'
    }
}, {
    timestamps: true,
    collection: 'API_COP_COMPONENT_STATUS'
});

// Índices para optimizar consultas
copComponentStatusSchema.index({ idProductInstance: 1 });
copComponentStatusSchema.index({ productName: 1 });
copComponentStatusSchema.index({ transactionId: 1 });
copComponentStatusSchema.index({ deployStatus: 1 });

export default mongoose.model('CopComponentStatus', copComponentStatusSchema); 