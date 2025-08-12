import express from 'express';
import {
  createComponentStatus,
  getComponentStatuses,
  getComponentStatusesByProductInstance,
  getComponentStatusById,
  updateComponentStatus,
  deleteComponentStatus,
  createMultipleComponentStatuses
} from '../../controllers/apiCop/copComponentStatusController.js';

const router = express.Router();

// Crear un nuevo componente status
router.post('/Create', createComponentStatus);

// Crear múltiples componentes status
router.post('/CreateMultiple', createMultipleComponentStatuses);

// Obtener todos los componentes status
router.get('/GetAll', getComponentStatuses);

// Obtener componentes status por idProductInstance
router.get('/GetByProductInstance/:idProductInstance', getComponentStatusesByProductInstance);

// Obtener un componente status por ID
router.get('/GetById/:id', getComponentStatusById);

// Actualizar un componente status por ID
router.put('/Update/:id', updateComponentStatus);

// Eliminar un componente status por ID
router.delete('/Delete/:id', deleteComponentStatus);

export default router; 