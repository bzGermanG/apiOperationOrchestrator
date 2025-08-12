import express from 'express';
const router = express.Router();

import {
    createBizagiProduct,
    getBizagiProducts,
    getBizagiProductById,
    updateBizagiProduct,
    deleteBizagiProduct,
    getBizagiProductsByCompany,
    getBizagiProductsByRegion,
    getBizagiProductsByChannel,
    getStatus,
    getBizagiProductComponentStatuses
} from '../../controllers/apiCop/copBAProductController.js';

// Crear producto Bizagi
router.post('/Create', createBizagiProduct);
console.log("ROUTE: /v1/Product/Create");

//Obtener el estado del producto.
router.get('/:id/Status', getStatus)

//Obtener los componentes status del producto.
router.get('/:idProductInstance/ComponentStatuses', getBizagiProductComponentStatuses)

//Obtener todos los productos Bizagi
router.get('/', getBizagiProducts);

// Obtener un producto Bizagi por ID
router.get('/:id', getBizagiProductById);

// Actualizar un producto Bizagi por ID
router.put('/:id', updateBizagiProduct);

// Eliminar un producto Bizagi por ID
router.delete('/:id', deleteBizagiProduct);

// Obtener productos Bizagi por compañía
router.get('/company/:idCompany', getBizagiProductsByCompany);

// Obtener productos Bizagi por región
router.get('/region/:idRegion', getBizagiProductsByRegion);

// Obtener productos Bizagi por canal
router.get('/channel/:channel', getBizagiProductsByChannel);

export default router; 