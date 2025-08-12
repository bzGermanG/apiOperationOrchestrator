import CopCategory from '../../model/apiCop/copCategory.js';


// Obtener todas las categorías
async function getAllCategories(req, res) {
    try {
        const categories = await CopCategory.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error al obtener las categorías', 
            error: error.message 
        });
    }
}

// Obtener una categoría por ID
async function getCategoryById(req, res) {
    try {
        const category = await CopCategory.findOne({ idCategory: req.params.id });
        if (!category) {
            return res.status(404).json({ 
                success: false, 
                message: 'Categoría no encontrada' 
            });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error al obtener la categoría', 
            error: error.message 
        });
    }
}

// Crear una nueva categoría
async function createCategory(req, res) {
    try {
        const { name, idCategory } = req.body;
        const category = new CopCategory({ name, idCategory });
        const savedCategory = await category.save();
        res.status(201).json({
            success: true,
            data: savedCategory
        });
    } catch (error) {
        res.status(400).json({ 
            success: false, 
            message: 'Error al crear la categoría', 
            error: error.message 
        });
    }
}

// Actualizar una categoría
async function updateCategory(req, res) {
    try {
        const { name } = req.body;
        const category = await CopCategory.findOneAndUpdate(
            { idCategory: req.params.id },
            { name },
            { new: true, runValidators: true }
        );
        if (!category) {
            return res.status(404).json({ 
                success: false, 
                message: 'Categoría no encontrada' 
            });
        }
        res.json({
            success: true,
            data: category
        });
    } catch (error) {
        res.status(400).json({ 
            success: false, 
            message: 'Error al actualizar la categoría', 
            error: error.message 
        });
    }
}

// Eliminar una categoría
async function deleteCategory(req, res) {
    try {
        const category = await CopCategory.findOneAndDelete({ idCategory: req.params.id });
        if (!category) {
            return res.status(404).json({ 
                success: false, 
                message: 'Categoría no encontrada' 
            });
        }
        res.json({ 
            success: true, 
            message: 'Categoría eliminada exitosamente' 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error al eliminar la categoría', 
            error: error.message 
        });
    }
} 

export {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};