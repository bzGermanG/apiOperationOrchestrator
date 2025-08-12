import CopEnvCategory from '../../model/apiCop/copEnvCategory.js';

// Obtener todas las categorías de entorno
async function getAllEnvCategories(req, res) {
    try {
        const envCategories = await CopEnvCategory.find();
        res.json(envCategories);
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error al obtener las categorías de entorno', 
            error: error.message 
        });
    }
}

// Obtener una categoría de entorno por ID
async function getEnvCategoryById(req, res) {
    try {
        const envCategory = await CopEnvCategory.findOne({ categoryId: req.params.id });
        if (!envCategory) {
            return res.status(404).json({ 
                success: false, 
                message: 'Categoría de entorno no encontrada' 
            });
        }
        res.json(envCategory);
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error al obtener la categoría de entorno', 
            error: error.message 
        });
    }
}

// Crear una nueva categoría de entorno
async function createEnvCategory(req, res) {
    try {
        const envCategory = new CopEnvCategory(req.body);
        const savedEnvCategory = await envCategory.save();
        res.status(201).json({
            success: true,
            data: savedEnvCategory
        });
    } catch (error) {
        res.status(400).json({ 
            success: false, 
            message: 'Error al crear la categoría de entorno', 
            error: error.message 
        });
    }
}

// Actualizar una categoría de entorno
async function updateEnvCategory(req, res) {
    try {
        const envCategory = await CopEnvCategory.findOneAndUpdate(
            { categoryId: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!envCategory) {
            return res.status(404).json({ 
                success: false, 
                message: 'Categoría de entorno no encontrada' 
            });
        }
        res.json({
            success: true,
            data: envCategory
        });
    } catch (error) {
        res.status(400).json({ 
            success: false, 
            message: 'Error al actualizar la categoría de entorno', 
            error: error.message 
        });
    }
}

// Eliminar una categoría de entorno
async function deleteEnvCategory(req, res) {
    try {
        const envCategory = await CopEnvCategory.findOneAndDelete({ categoryId: req.params.id });
        if (!envCategory) {
            return res.status(404).json({ 
                success: false, 
                message: 'Categoría de entorno no encontrada' 
            });
        }
        res.json({ 
            success: true, 
            message: 'Categoría de entorno eliminada exitosamente' 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error al eliminar la categoría de entorno', 
            error: error.message 
        });
    }
}

export {
    getAllEnvCategories,
    getEnvCategoryById,
    createEnvCategory,
    updateEnvCategory,
    deleteEnvCategory
};