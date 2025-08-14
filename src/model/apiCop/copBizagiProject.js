import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const copBizagiProjectSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'El id es requerido'],
        unique: true,
        default: () => uuidv4()
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    subscriptionId: {
        type: String,
        required: [true, 'El subscriptionId es requerido'],
        ref: 'copBizagiSubscription'
    }
}, {
    timestamps: true,
    collection: 'API_COP_BIZAGI_PROJECT'
});

export default mongoose.model('copBizagiProject', copBizagiProjectSchema);