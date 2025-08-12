import express from 'express';
const router = express.Router();

import {
    createCompany,
    getCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany
} from '../../controllers/apiCop/copCompanyController.js';

// Crear compañía
router.post('/Create', createCompany);
// Obtener todas las compañías
router.get('/', getCompanies);
// Obtener una compañía por ID
router.get('/:id', getCompanyById);
// Actualizar una compañía por ID
router.put('/:id', updateCompany);
// Eliminar una compañía por ID
router.delete('/:id', deleteCompany);

export default router; 
