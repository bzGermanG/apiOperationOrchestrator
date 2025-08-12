import mongoose from 'mongoose';

const copEnvCategorySchema = new mongoose.Schema({
    categoryId: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    tier: {
        type: String,
        required: true,
        trim: true
    },
    vmType: {
        type: String,
        required: true,
        trim: true
    },
    dbType: {
        type: String,
        required: true,
        trim: true
    },
    isolationLevel: {
        type: String,
        required: true,
        trim: true
    },
    isClustered: {
        type: Boolean,
        required: true
    },
    bpu: {
        type: Number,
        required: true
    },
    isVisible: {
        type: Boolean,
        required: true
    },
    dbSizeGB: {
        type: Number,
        required: true
    },
    dbEdition: {
        type: String,
        required: true,
        trim: true
    },
    vmInstanceCount: {
        type: Number,
        required: true
    },
    spCommonSKU: {
        type: String,
        required: true,
        trim: true
    },
    spCommonWorkerCount: {
        type: Number,
        required: true
    },
    spSchedulerSKU: {
        type: String,
        required: true,
        trim: true
    },
    spSchedulerWorkerCount: {
        type: Number,
        required: true
    },
    sizeStorageGB: {
        type: Number,
        required: true
    },
    isTestTier: {
        type: Boolean,
        required: true
    },
    isResourceShared: {
        type: Boolean,
        required: true
    },
    isLargeEnvironment: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true,
    collection: 'API_COP_ENVCATEGORIES'
});

export default mongoose.model('CopEnvCategory', copEnvCategorySchema);