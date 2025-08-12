import CopCompany from '../../model/apiCop/copCompany.js';
import CopTier from '../../model/apiCop/copTier.js';

// Crear una nueva compañía
async function createCompany(req, res) {
  try 
  {
    
    // Conversión de azureSubscriptions de array a objeto si es necesario
    if (Array.isArray(req.body.azureSubscriptions) && req.body.azureSubscriptions.length === 1) {
      req.body.azureSubscriptions = req.body.azureSubscriptions[0];
    }
    // Validar que el idTier exista
    if (req.body.realTier == undefined || req.body.realTier == null) {
      return res.status(400).json({ error: 'Es requerido in realTier.' });
    }

    if (req.body.sharedInfrastructureServices === undefined) {
      return res.status(400).json({ error: 'Es requerido sharedInfrastructureServices (Si no es infra compartida se debe enviar en null).' });
    }

    const tier = await CopTier.findOne({ idTier: req.body.realTier });
    if (!tier) {
      return res.status(400).json({ error: 'El idTier proporcionado no existe.' });
    }
    // Validar que el nombre de la compañía no exista
    const tempCompanyName = req.body.displayName + process.env.COP_PRE_COMPANY_NAME;
    const existingCompany = await CopCompany.findOne({ displayName: tempCompanyName });
    if (existingCompany) {
      return res.status(400).json({ error: 'El nombre de la compañía ya existe.' });
    }
    req.body.displayName = tempCompanyName; 
    const company = new CopCompany(req.body);
    await company.save();
    res.status(200).json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todas las compañías
async function getCompanies(req, res) {
  try {
    const companies = await CopCompany.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una compañía por ID
async function getCompanyById(req, res) {
  try {
    const company = await CopCompany.findOne({ id: req.params.id });
    if (!company) return res.status(404).json({ error: 'Compañía no encontrada' });
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una compañía por ID
async function updateCompany(req, res) {
  try {
    const company = await CopCompany.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!company) return res.status(404).json({ error: 'Compañía no encontrada' });
    res.json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar una compañía por ID
async function deleteCompany(req, res) {
  try {
    const company = await CopCompany.findOneAndDelete({ id: req.params.id });
    if (!company) return res.status(404).json({ error: 'Compañía no encontrada' });
    res.json({ mensaje: 'Compañía eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 

export {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany
};