import express from 'express';
const router = express.Router();

import { 
    getStatus, 
    getComponentStatusesByProductInstanceAndCompany 
} from '../../controllers/apiCop/copStatusController.js';

router.get('/:id', getStatus);

// Nueva ruta para obtener componentes status por IdProductInstance e IdCompany
router.get('/IdProductInstance/:idProductInstance/IdCompany/:idCompany', getComponentStatusesByProductInstanceAndCompany);

export default router; 