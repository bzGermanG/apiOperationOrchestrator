import express from 'express';
import CopRecipesController from '../../controllers/apiCop/copRecipesController.js';

const router = express.Router();

// Rutas CRUD para recetas
//router.get('/', CopRecipesController.getAllRecipes);
router.get('/', CopRecipesController.getRecipesFilter);
router.get('/:id', CopRecipesController.getRecipeById);
//router.post('/', CopRecipesController.createRecipe);
router.post('/', CopRecipesController.getRecipesFilter);
router.put('/:id', CopRecipesController.updateRecipe);
router.delete('/:id', CopRecipesController.deleteRecipe);

export default router; 
