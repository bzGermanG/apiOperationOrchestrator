import express from 'express';
const router = express.Router();

import {
    getRegions,
    getRegionById,
    createRegion,
    updateRegion,
    deleteRegion,
    getAllRegions
} from '../../controllers/apiCop/copRegionController.js';

// Rutas para el CRUD de regiones
router.get('', getAllRegions);
router.get('', getRegions);
router.get('/:id', getRegionById);
router.post('', createRegion);
router.put(':id', updateRegion);
router.delete('/:id', deleteRegion);

export default router; 
