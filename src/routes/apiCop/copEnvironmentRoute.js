import express from 'express';
const router = express.Router();

import {
    enableMaintenanceWindow,
    disableMaintenanceWindow
} from '../../controllers/apiCop/copBAProductController.js';

router.put('/:idEnv/MaintenanceWindow', enableMaintenanceWindow);
router.delete('/:idEnv/MaintenanceWindow', disableMaintenanceWindow);

export default router;