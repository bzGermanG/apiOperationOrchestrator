import express from 'express';
const router = express.Router();

import {
    getUUID
} from '../../controllers/apiUtils/apiUtilsController.js'

//Generar UUID
router.use("/UUID", getUUID);
console.log("ROUTE: /Utils/UUID");

export default router; 