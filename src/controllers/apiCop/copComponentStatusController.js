import CopComponentStatus from '../../model/apiCop/copComponentStatus.js';

// Crear un nuevo componente status
async function createComponentStatus(req, res) {
  try {
    const componentStatus = new CopComponentStatus(req.body);
    await componentStatus.save();
    res.status(201).json(componentStatus);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Obtener todos los componentes status
async function getComponentStatuses(req, res) {
  try {
    const componentStatuses = await CopComponentStatus.find();
    res.json(componentStatuses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtener componentes status por idProductInstance
async function getComponentStatusesByProductInstance(req, res) {
  try {
    const componentStatuses = await CopComponentStatus.find({ 
      idProductInstance: req.params.idProductInstance 
    });
    res.json(componentStatuses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtener un componente status por ID
async function getComponentStatusById(req, res) {
  try {
    const componentStatus = await CopComponentStatus.findById(req.params.id);
    if (!componentStatus) return res.status(404).json({ error: 'Componente status no encontrado' });
    res.json(componentStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Actualizar un componente status por ID
async function updateComponentStatus(req, res) {
  try {
    const componentStatus = await CopComponentStatus.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!componentStatus) return res.status(404).json({ error: 'Componente status no encontrado' });
    res.json(componentStatus);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Eliminar un componente status por ID
async function deleteComponentStatus(req, res) {
  try {
    const componentStatus = await CopComponentStatus.findByIdAndDelete(req.params.id);
    if (!componentStatus) return res.status(404).json({ error: 'Componente status no encontrado' });
    res.json({ mensaje: 'Componente status eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Crear múltiples componentes status
async function createMultipleComponentStatuses(req, res) {
  try {
    const componentStatuses = await CopComponentStatus.insertMany(req.body);
    res.status(201).json(componentStatuses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export {
  createComponentStatus,
  getComponentStatuses,
  getComponentStatusesByProductInstance,
  getComponentStatusById,
  updateComponentStatus,
  deleteComponentStatus,
  createMultipleComponentStatuses
}; 