import CopBizagiProduct from '../../model/apiCop/copBizagiProduct.js';
import CopCompany from '../../model/apiCop/copCompany.js';
import CopRegion from '../../model/apiCop/copRegion.js';
import CopRecipes from '../../model/apiCop/copRecipes.js';
import CopProduct from '../../model/apiCop/copProduct.js';
import CopComponentStatus from '../../model/apiCop/copComponentStatus.js';
import EnvCategory from '../../model/apiCop/copEnvCategory.js'; // Asegúrate de tener este modelo creado

// Función auxiliar para crear componentes status basados en el nombre del producto
async function createComponentStatusesForProduct(productName, idProductInstance, transactionId) {
  const componentStatuses = [];
  
  // Mapeo de nombres de productos a sus componentes con estados específicos
  const productComponentMapping = {
    'RunBaselineRegion': [
      { productName: 'RunBaselineRegion', deployStatus: 'IN_QUEUE' },
      { productName: 'StatusReport', deployStatus: 'IN_QUEUE' },
      { productName: 'RunBaseline', deployStatus: 'IN_QUEUE' }
    ],
    'RunBaseline': [
      { productName: 'RunBaseline', deployStatus: 'IN_QUEUE' },
      { productName: 'StatusReport', deployStatus: 'IN_QUEUE' }
    ],
    'StatusReport': [
      { productName: 'StatusReport', deployStatus: 'IN_QUEUE' }
    ],
    'CustomerPortal': [
      { productName: 'CustomerPortal', deployStatus: 'IN_QUEUE' },
      { productName: 'GenAI', deployStatus: 'IN_QUEUE' },
      { productName: 'OperationManager', deployStatus: 'IN_QUEUE' },
      { productName: 'Platform', deployStatus: 'IN_QUEUE' },
      { productName: 'Catalog', deployStatus: 'IN_QUEUE' },
      { productName: 'UserRegister', deployStatus: 'IN_QUEUE' },
      { productName: 'Accounts2', deployStatus: 'IN_QUEUE' },
      { productName: 'Accounts', deployStatus: 'IN_QUEUE' },
      { productName: 'General', deployStatus: 'IN_QUEUE' }
    ],
    'Build': [
      { productName: 'Build', deployStatus: 'IN_QUEUE' },
      { productName: 'CustomerPortal', deployStatus: 'IN_QUEUE' },
      { productName: 'GenAI', deployStatus: 'IN_QUEUE' },
      { productName: 'Platform', deployStatus: 'IN_QUEUE' },
      { productName: 'Catalog', deployStatus: 'IN_QUEUE' },
      { productName: 'UserRegister', deployStatus: 'IN_QUEUE' },
      { productName: 'Accounts2', deployStatus: 'IN_QUEUE' },
      { productName: 'Accounts', deployStatus: 'IN_QUEUE' },
      { productName: 'General', deployStatus: 'IN_QUEUE' }
    ]
    // Puedes agregar más mapeos aquí según sea necesario
  };
  
  if (productComponentMapping[productName]) {
    componentStatuses.push(...productComponentMapping[productName].map(component => ({
      productName: component.productName,
      transactionId: transactionId,
      idProductInstance: idProductInstance,
      deployStatus: component.deployStatus
    })));
  } else {
    // Para productos no mapeados, crear un componente con el mismo nombre
    componentStatuses.push({
      productName: productName,
      transactionId: transactionId,
      idProductInstance: idProductInstance,
      deployStatus: 'IN_QUEUE'
    });
  }
  
  try {
    await CopComponentStatus.insertMany(componentStatuses);
    return componentStatuses;
  } catch (error) {
    throw new Error(`Error al crear componentes status: ${error.message}`);
  }
}

// Crear un nuevo producto Bizagi
async function createBizagiProduct(req, res) 
{
  try 
  {
    // Soportar datos dentro de req.body.parameters
    if (req.body.parameters && typeof req.body.parameters === 'object') {
      req.body = { ...req.body, ...req.body.parameters };
      delete req.body.parameters;
    }

    // Validar que el idCompany exista
    const company = await CopCompany.findOne({ idCompany: req.body.idCompany });
    if (!company) {
      return res.status(400).json({ error: 'El idCompany proporcionado no existe.' });
    }

    // Validar que el idRegion exista
    const region = await CopRegion.findOne({ idRegion: req.body.idRegion });
    if (!region) {
      return res.status(400).json({ error: 'El idRegion proporcionado no existe.' });
    }

    // Validar que el idProductCategoryVersion exista
    const recipe = await CopRecipes.findOne({ idProductCategoryVersion: req.body.idProductCategoryVersion });
    if (!recipe) {
      return res.status(400).json({ error: 'El idProductCategoryVersion proporcionado no existe.' });
    }

    // Validar que el idProduct exista
    const product = await CopProduct.findOne({ idProduct: req.body.idProduct });
    if (!product) {
      return res.status(400).json({ error: 'El idProduct proporcionado no existe.' });
    }

    if (product.name == "Build")
    {
      const amountLicenses = req.body.amountLicenses;
      if (
        amountLicenses === undefined ||
        amountLicenses === '' ||
        Number(amountLicenses) < 1
      )
      {
        return res.status(400).json({ error: 'amountLicenses es requerido y debe ser mayor a 1.' });
      }
    }
    
    // Validar que el idProductInstance no exista (aunque el modelo ya lo valida, es mejor validar antes)
    const existingProduct = await CopBizagiProduct.findOne({ idProductInstance: req.body.idProductInstance });
    if (existingProduct) {
      return res.status(400).json({ error: 'El idProductInstance ya existe.' });
    }

    // Agregar deployStatus por defecto
    const productData = {
      ...req.body,
      deployStatus: 'creating'
    };

    const bizagiProduct = new CopBizagiProduct(productData);
    await bizagiProduct.save();
    
    // Crear componentes status para el producto
    try {
      await createComponentStatusesForProduct(
        product.name, 
        bizagiProduct.idProductInstance, 
        bizagiProduct.transactionId
      );
    } catch (componentError) {
      // Si falla la creación de componentes, eliminar el producto creado
      await CopBizagiProduct.findOneAndDelete({ idProductInstance: bizagiProduct.idProductInstance });
      return res.status(500).json({ error: componentError.message });
    }
    
    res.status(202).json(bizagiProduct);
  } 
  catch (error) 
  {
    res.status(400).json({ error: error.message });
  }
}

// Crear un nuevo ambiente bizagi
async function createBizagiEnvironment(req, res)
{
  try 
  {
    // Si existe req.body.Parameters, extraer sus campos al nivel raíz
    let envData = { ...req.body };
    if (envData.Parameters && typeof envData.Parameters === 'object') 
    {
      envData = { ...envData, ...envData.Parameters };
      delete envData.Parameters;
    }

    // Validar atributos requeridos
    const requiredFields = [
      'idCompany',
      'idRegion',
      'idAzureSubscription',
      'idProductCategoryVersion',
      'category',
      'environmentType',
      'adminEmail',
      'environmentName',
      'build'
    ];
    const missingFields = requiredFields.filter(field => !envData[field] || envData[field] === '');
    if (missingFields.length > 0) {
      return res.status(400).json({ error: `Faltan los siguientes campos requeridos: ${missingFields.join(', ')}` });
    }

    // Validar que el idCompany exista
    const company = await CopCompany.findOne({ idCompany: envData.idCompany });
    if (!company) {
      return res.status(400).json({ error: 'El idCompany proporcionado no existe.' });
    }

    // Validar que el idRegion exista
    const region = await CopRegion.findOne({ idRegion: envData.idRegion });
    if (!region) {
      return res.status(400).json({ error: 'El idRegion proporcionado no existe.' });
    }

    // Validar que el idProductCategoryVersion exista
    const recipe = await CopRecipes.findOne({ idProductCategoryVersion: envData.idProductCategoryVersion });
    if (!recipe) {
      return res.status(400).json({ error: 'El idProductCategoryVersion proporcionado no existe.' });
    }

    // Validar que la categoría exista en EnvCategory
    const envCategory = await EnvCategory.findOne({ name: envData.category });
    if (!envCategory) {
      return res.status(400).json({ error: `La categoría '${envData.category}' no existe en EnvCategory.` });
    }

    // Buscar el idProduct del producto con nombre 'BizagiPaaS'
    const bizagiPaaSProduct = await CopProduct.findOne({ name: 'BizagiPaaS' });
    if (!bizagiPaaSProduct) {
      return res.status(400).json({ error: 'No se encontró el producto BizagiPaaS.' });
    }
    const idProduct = bizagiPaaSProduct.idProduct;

    // Agregar deployStatus por defecto
    const productData = {
      ...envData,
      idProduct: idProduct,
      deployStatus: 'creating'
    };

    const bizagiProduct = new CopBizagiProduct(productData);
    await bizagiProduct.save();

     // Crear componentes status para el producto
    try 
    {
      await createComponentStatusesForProduct(
        bizagiPaaSProduct.name, 
        bizagiProduct.idProductInstance, 
        bizagiProduct.transactionId
      );
    } 
    catch (componentError) 
    {
      // Si falla la creación de componentes, eliminar el producto creado
      await CopBizagiProduct.findOneAndDelete({ idProductInstance: bizagiProduct.idProductInstance });
      return res.status(500).json({ error: componentError.message });
    }
    
    res.status(202).json(bizagiProduct);

    // Si pasa la validación, continuar con la lógica (por ahora solo retornar el objeto)
    res.status(202).json(envData);
  } 
  catch (error) 
  {
    res.status(400).json({ error: error.message });
  }
}

//Obtener el status del producto
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

// Obtener todos los productos Bizagi
async function getBizagiProducts(req, res) {
  try {
    const bizagiProducts = await CopBizagiProduct.find();
    res.json(bizagiProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtener un producto Bizagi por ID
async function getBizagiProductById(req, res) {
  try {
    const bizagiProduct = await CopBizagiProduct.findOne({ idProductInstance: req.params.id });
    if (!bizagiProduct) return res.status(404).json({ error: 'Producto Bizagi no encontrado' });
    res.json(bizagiProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Actualizar un producto Bizagi por ID
async function updateBizagiProduct(req, res) {
  try {
    // Soportar datos dentro de req.body.parameters
    if (req.body.parameters && typeof req.body.parameters === 'object') {
      req.body = { ...req.body, ...req.body.parameters };
      delete req.body.parameters;
    }

    // Si se está actualizando el idCompany, validar que exista
    if (req.body.idCompany) {
      const company = await CopCompany.findOne({ id: req.body.idCompany });
      if (!company) {
        return res.status(400).json({ error: 'El idCompany proporcionado no existe.' });
      }
    }

    // Si se está actualizando el idRegion, validar que exista
    if (req.body.idRegion) {
      const region = await CopRegion.findOne({ idRegion: req.body.idRegion });
      if (!region) {
        return res.status(400).json({ error: 'El idRegion proporcionado no existe.' });
      }
    }

    // Si se está actualizando el idProductCategoryVersion, validar que exista
    if (req.body.idProductCategoryVersion) {
      const recipe = await CopRecipes.findOne({ idProductCategoryVersion: req.body.idProductCategoryVersion });
      if (!recipe) {
        return res.status(400).json({ error: 'El idProductCategoryVersion proporcionado no existe.' });
      }
    }

    // Si se está actualizando el idProduct, validar que exista
    if (req.body.idProduct) {
      const product = await CopProduct.findOne({ idProduct: req.body.idProduct });
      if (!product) {
        return res.status(400).json({ error: 'El idProduct proporcionado no existe.' });
      }
    }

    const bizagiProduct = await CopBizagiProduct.findOneAndUpdate(
      { idProductInstance: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!bizagiProduct) return res.status(404).json({ error: 'Producto Bizagi no encontrado' });
    res.json(bizagiProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Eliminar un producto Bizagi por ID
async function deleteBizagiProduct(req, res) {
  try {
    const bizagiProduct = await CopBizagiProduct.findOneAndDelete({ idProductInstance: req.params.id });
    if (!bizagiProduct) return res.status(404).json({ error: 'Producto Bizagi no encontrado' });
    res.json({ mensaje: 'Producto Bizagi eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtener productos Bizagi por compañía
async function getBizagiProductsByCompany(req, res) {
  try {
    const bizagiProducts = await CopBizagiProduct.find({ idCompany: req.params.idCompany });
    res.json(bizagiProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtener productos Bizagi por región
async function getBizagiProductsByRegion(req, res) {
  try {
    const bizagiProducts = await CopBizagiProduct.find({ idRegion: req.params.idRegion });
    res.json(bizagiProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtener productos Bizagi por canal
async function getBizagiProductsByChannel(req, res) {
  try {
    const bizagiProducts = await CopBizagiProduct.find({ Channel: req.params.channel });
    res.json(bizagiProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtener componentes status de un producto Bizagi
async function getBizagiProductComponentStatuses(req, res) {
  try {
    const componentStatuses = await CopComponentStatus.find({ 
      idProductInstance: req.params.idProductInstance 
    });
    res.json(componentStatuses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export {
  createBizagiProduct,
  createBizagiEnvironment,
  getBizagiProducts,
  getBizagiProductById,
  updateBizagiProduct,
  deleteBizagiProduct,
  getBizagiProductsByCompany,
  getBizagiProductsByRegion,
  getBizagiProductsByChannel,
  getStatus,
  getBizagiProductComponentStatuses
};