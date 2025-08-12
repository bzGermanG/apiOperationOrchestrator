import express from 'express';
const router = express.Router();

import {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
} from '../../controllers/apiCop/copCategoryController.js';

// Rutas para el CRUD de productos
router.get('/', getAllCategories);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router; 