import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const copBizagiSubscriptionSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'El id es requerido'],
        unique: true,
        default: () => uuidv4()
    },
    subscriptionName: {
        type: String
    },
    subscriptionStatus: {
        type: String
    },
    idCompany: {
        type: String,
        required: [true, 'El idCompany es requerido'],
        ref: 'copCompany'
    },
    companyName: {
        type: String,
        required: false
    },
    subscriptionType: {
        type: String,
        required: false
    }
}, {
    timestamps: true,
    collection: 'API_COP_BIZAGI_SUBSCRIPTION'
});

export default mongoose.model('copBizagiSubscription', copBizagiSubscriptionSchema);