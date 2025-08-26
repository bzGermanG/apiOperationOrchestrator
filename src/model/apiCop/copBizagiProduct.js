import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const copBizagiProductSchema = new mongoose.Schema({
    idCompany: {
        type: String,
        required: [true, 'El idCompany es requerido'],
        ref: 'copCompany'
    },
    idRegion: {
        type: String,
        required: [true, 'El idRegion es requerido'],
        ref: 'CopRegion'
    },
    idAzureSubscription: {
        type: String,
        required: [true, 'El idAzureSubscription es requerido']
    },
    idProductCategoryVersion: {
        type: String,
        required: [true, 'El idProductCategoryVersion es requerido'],
        ref: 'CopRecipes'
    },
    idProduct: {
        type: String,
        required: [true, 'El idProduct es requerido'],
        ref: 'CopProduct'
    },
    Channel: {
        type: String,
        enum: ['qa', 'dev', 'prod', 'uat']
    },
    Security: {
        type: String,
        enum: ['true', 'false']
    },
    idProductInstance: {
        type: String,
        required: [true, 'El idProductInstance es requerido'],
        unique: true,
        default: () => uuidv4()
    },
    deployStatus: {
        type: String,
        enum: ['in queue', 'creating', 'updating', 'error', 'infrastructure error', 'configuration error', 'created']
    },
    transactionId: {
        type: String,
        default: () => uuidv4()
    },
    email: {
        type: String,
        match: [/^([a-zA-Z0-9_\-.+]+)@([a-zA-Z0-9\-.]+)\.([a-zA-Z]{2,})$/, 'El email no tiene un formato válido']
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    password: {
        type: String
    },
    amountLicenses: {
        type: Number
        // Opcional, no se requiere
    },
    category: {
        type: String
        // No obligatorio
    },
    environmentType: {
        type: String,
        enum: ['Dev', 'Test', 'Stage', 'Prod']
        // No obligatorio
    },
    adminEmail: {
        type: String,
        match: [/^([a-zA-Z0-9_\-.+]+)@([a-zA-Z0-9\-.]+)\.([a-zA-Z]{2,})$/, 'El adminEmail no tiene un formato válido']
        // No obligatorio
    },
    environmentName: {
        type: String
        // No obligatorio
    },
    smtpEnableSsl: {
        type: String
        // No obligatorio
    },
    smtpServer: {
        type: String
        // No obligatorio
    },
    smtpAccount: {
        type: String
        // No obligatorio
    },
    smtpPassword: {
        type: String
        // No obligatorio
    },
    smtpSenderAcc: {
        type: String
        // No obligatorio
    },
    smtpType: {
        type: String
        // No obligatorio
    },
    build: {
        type: String
        // No obligatorio
    },
    environmentId: {
        type: String
    }
}, {
    timestamps: true,
    collection: 'API_COP_BIZAGI_PRODUCTS'
});

// Índices para optimizar consultas
copBizagiProductSchema.index({ idProductInstance: 1 }, { unique: true });
copBizagiProductSchema.index({ idCompany: 1 });
copBizagiProductSchema.index({ idRegion: 1 });
copBizagiProductSchema.index({ idProduct: 1 });
copBizagiProductSchema.index({ Channel: 1 });

// Método para validar que el idProductInstance sea único
copBizagiProductSchema.pre('save', async function(next) {
    if (this.isModified('idProductInstance')) {
        const existingProduct = await this.constructor.findOne({
            idProductInstance: this.idProductInstance,
            _id: { $ne: this._id }
        });
        if (existingProduct) {
            throw new Error('Ya existe un producto Bizagi con este idProductInstance');
        }
    }
    next();
});

export default mongoose.model('copBizagiProduct', copBizagiProductSchema);