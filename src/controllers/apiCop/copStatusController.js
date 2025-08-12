import CopBizagiProduct from '../../model/apiCop/copBizagiProduct.js';
import CopComponentStatus from '../../model/apiCop/copComponentStatus.js';

// Obtener el estado o status.
async function getStatus(req, res) 
{
    try 
    {
        const bizagiProduct = await CopBizagiProduct.findOne({ idProductInstance: req.params.id });
        if (!bizagiProduct)
        {
            return res.status(404).json({ error: 'Producto Bizagi no encontrado' });
        } 
        
        const resStatus = {
            "idProductInstance": bizagiProduct.idProductInstance,
            "deployStatus": bizagiProduct.deployStatus,
            "transactionId": bizagiProduct.transactionId
        };

        res.json(resStatus);
    } 
    catch (error) 
    {
        res.status(500).json({ error: error.message });
    }
}

// Obtener componentes status por IdProductInstance e IdCompany
async function getComponentStatusesByProductInstanceAndCompany(req, res) 
{
    try 
    {
        const { idProductInstance, idCompany } = req.params;
        
        // Primero validar que el BizagiProduct existe y pertenece a la compañía
        const bizagiProduct = await CopBizagiProduct.findOne({ 
            idProductInstance: idProductInstance,
            idCompany: idCompany
        });
        
        if (!bizagiProduct)
        {
            return res.status(404).json({ 
                error: 'Producto Bizagi no encontrado para la combinación de IdProductInstance e IdCompany proporcionados' 
            });
        } 
        
        // Obtener todos los componentes status del producto
        const componentStatuses = await CopComponentStatus.find({ 
            idProductInstance: idProductInstance 
        });
        
        res.json(componentStatuses);
    } 
    catch (error) 
    {
        res.status(500).json({ error: error.message });
    }
}

export {
    getStatus,
    getComponentStatusesByProductInstanceAndCompany
  }; 
