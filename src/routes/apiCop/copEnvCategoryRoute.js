import express from 'express';
const router = express.Router();

import {
    getAllEnvCategories,
    createEnvCategory,
    updateEnvCategory,
    deleteEnvCategory
} from '../../controllers/apiCop/copEnvCategoryController.js';

// Rutas para el CRUD de productos
router.get('/', getAllEnvCategories);
router.post('/', createEnvCategory);
router.put('/:id', updateEnvCategory);
router.delete('/:id', deleteEnvCategory);

export default router; 