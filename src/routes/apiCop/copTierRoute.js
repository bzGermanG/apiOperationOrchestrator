import express from 'express';

const router = express.Router();

import {
    getAllCopTiers,
    getCopTiersWithFilters,
    getCopTierById,
    createCopTier,
    updateCopTier,
    deleteCopTier,
    restoreCopTier
} from '../../controllers/apiCop/copTierController.js';

// Rutas para CopTier
router.route('')
    .get(getAllCopTiers);

router.route('')
    .post(createCopTier);

// Ruta para obtener CopTiers con filtros
router.get('/filter', getCopTiersWithFilters);

router.route('/:id')
    .get(getCopTierById)
    .put(updateCopTier)
    .delete(deleteCopTier);

// Ruta para restaurar un CopTier
router.patch('/:id/restore', restoreCopTier);

export default router; 