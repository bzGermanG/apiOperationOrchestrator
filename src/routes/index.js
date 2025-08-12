import express from 'express';

const router = express.Router();

//2GJ: RUTA DE VALIDACION DE ESTADO DE LA API.
router.get("/status", (req, res) => {
    console.log("StatusGET ==> " + req.body);
    res.status(200).send({
        status: "OK",
        message: "#### Api is running (2GJ) ####",
        timestamp: new Date().toISOString(),
        "ResponseBodyInput": req.body
    });
})

router.post("/status", (req, res) => {
    console.log("StatusPOST ==> " + req.body);
    console.log('Parsed Body:', req.body);      // { Dato1:1, Dato2:'2' }
    console.log('Raw Body:', req.rawBody);  
    res.status(200).send({
        status: "OK",
        message: "#### Api is running (2GJ) ####",
        timestamp: new Date().toISOString(),
        "ResponseBodyInput": req.body
    });
})



//2GJ: RUTAS DE DUMMY API COP.
const ApiCopV1 = await import('./apiCop/copApiV1.js');
router.use("/v1", ApiCopV1.default);

//2GJ: RUTAS DE UTILS.
const Utils = await import('./apiUtils/apiUtils.js');
router.use("/Utils", Utils.default);

export default router;