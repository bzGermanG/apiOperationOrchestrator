import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const copRecipesSchema = new mongoose.Schema({
    BusinessVersion: {
        type: String,
        required: [true, 'La versión de negocio es requerida'],
        trim: true,
        index: true
    },
    idProduct: {
        type: String,
        required: [true, 'El producto es requerido']
    },
    isDevEnv: {
        type: Boolean,
        required: [true, 'El indicador de ambiente de desarrollo es requerido'],
        default: false,
        index: true
    },
    idProductCategoryVersion: {
        type: String,
        required: [true, 'La versión de categoría de producto es requerida'],
        unique: true,
        default: () => uuidv4()
    },
    displayName: {
        type: String,
        required: [true, 'El nombre de visualización es requerido'],
        trim: true,
        index: true
    },
    categoryType: {
        type: String,
        required: [true, 'La categoría es requerida']
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    collection: 'API_COP_RECIPES'
});

// Índices compuestos para consultas comunes
copRecipesSchema.index({ idProduct: 1, isActive: 1 });
copRecipesSchema.index({ categoryType: 1, isActive: 1 });
copRecipesSchema.index({ BusinessVersion: 1, isActive: 1 });

// Método para validar que el idProductCategoryVersion sea único
copRecipesSchema.pre('save', async function(next) {
    if (this.isModified('idProductCategoryVersion')) {
        const existingRecipe = await this.constructor.findOne({
            idProductCategoryVersion: this.idProductCategoryVersion,
            _id: { $ne: this._id }
        });
        if (existingRecipe) {
            throw new Error('Ya existe una receta con esta versión de categoría de producto');
        }
    }
    next();
});

export default mongoose.model('CopRecipes', copRecipesSchema); 