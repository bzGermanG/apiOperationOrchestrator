import express from 'express';

const router = express.Router();

//2GJ (2025-06-13): Se agrega el js puesto que en azure salta el error al no encontrat el modulo metadata.
const Metadata = await import('./metadata.js');
router.use("/Metadata", Metadata.default);

const Company = await import('./copCompanyRoute.js');
router.use("/Companies", Company.default);

const BizagiProduct = await import('./copBAProductRoute.js');
router.use("/Product", BizagiProduct.default);

const CopStatus = await import('./copStatusRouter.js');
router.use("/Status", CopStatus.default);

const ComponentStatus = await import('./copComponentStatusRoute.js');
router.use("/ComponentStatus", ComponentStatus.default);

const Environment = await import('./copEnvironmentRoute.js');
router.use("/Environment", Environment.default);

export default router; 