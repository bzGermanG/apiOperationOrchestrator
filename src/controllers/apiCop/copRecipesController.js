import CopRecipes from '../../model/apiCop/copRecipes.js';
import CopProduct from '../../model/apiCop/copProduct.js';
import CopCategory from '../../model/apiCop/copCategory.js';

class CopRecipesController {
    // Obtener todas las recetas con sus referencias pobladas
    static async getAllRecipes(req, res) {
        try {
            // Primero hacemos una consulta simple sin ordenamiento
            const recipes = await CopRecipes.find()
                .populate('idProduct', 'idProduct name');
                //.populate('categoryType', 'idCategory name');

            // Si no hay registros, retornamos un array vacío
            if (!recipes || recipes.length === 0) {
                return res.json([]);
            }

            // Si hay registros, intentamos ordenarlos en memoria
            const { sortBy = 'BusinessVersion', order = 'asc' } = req.query;
            
            // Validar que el campo de ordenamiento sea válido
            const allowedSortFields = ['BusinessVersion', 'displayName', 'isDevEnv'];
            if (!allowedSortFields.includes(sortBy)) {
                return res.status(400).json({
                    error: `Campo de ordenamiento inválido. Campos permitidos: ${allowedSortFields.join(', ')}`
                });
            }

            // Ordenar los resultados en memoria
            const sortedRecipes = [...recipes].sort((a, b) => {
                const aValue = a[sortBy];
                const bValue = b[sortBy];
                
                if (order.toLowerCase() === 'desc') {
                    return aValue < bValue ? 1 : -1;
                }
                return aValue > bValue ? 1 : -1;
            });

            // Devolver directamente el array de recetas
            res.json(sortedRecipes);
        } catch (error) {
            console.error('Error en getAllRecipes:', error);
            res.status(500).json({
                error: 'Error al obtener las recetas: ' + error.message
            });
        }
    }

    // Obtener recetas filtradas por criterios específicos
    static async getRecipesFilter(req, res) {
        try {
            const { BusinessVersion, idProduct, isDevEnv } = req.body;

            // Construir el objeto de filtros
            const filters = {};

            // Agregar filtros solo si están presentes en el request
            if (BusinessVersion) {
                filters.BusinessVersion = BusinessVersion;
            }

            if (idProduct) {
                filters.idProduct = idProduct;
            }

            if (isDevEnv !== undefined && isDevEnv !== null) {
                // Convertir string a boolean si es necesario
                filters.isDevEnv = isDevEnv === 'true' || isDevEnv === true;
            }
            
            // Realizar la consulta con los filtros aplicados
            const recipes = await CopRecipes.find(filters)

            // Si no hay registros, retornamos un array vacío
            if (!recipes || recipes.length === 0) {
                return res.json([]);
            }
                              
            res.json(recipes);
        } catch (error) {
            console.error('Error en getRecipesFilter:', error);
            res.status(500).json({
                success: false,
                message: 'Error al filtrar las recetas',
                error: error.message
            });
        }
    }

    // Obtener una receta por ID con sus referencias pobladas
    static async getRecipeById(req, res) {
        try {
            const recipe = await CopRecipes.findById(req.params.id)
                .populate('idProduct', 'idProduct name')
                .populate('categoryType', 'idCategory name');
            
            if (!recipe) {
                return res.status(404).json({
                    success: false,
                    message: 'Receta no encontrada'
                });
            }

            res.json({
                success: true,
                data: recipe
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener la receta',
                error: error.message
            });
        }
    }

    // Crear una nueva receta
    static async createRecipe(req, res) {
        try {
            const { idProduct, categoryType, ...recipeData } = req.body;

            // Validar que el producto existe
            const product = await CopProduct.findById(idProduct);
            if (!product) {
                return res.status(400).json({
                    success: false,
                    message: 'El producto especificado no existe'
                });
            }

            // Validar que la categoría existe
            const category = await CopCategory.findById(categoryType);
            if (!category) {
                return res.status(400).json({
                    success: false,
                    message: 'La categoría especificada no existe'
                });
            }

            const newRecipe = new CopRecipes({
                ...recipeData,
                idProduct,
                categoryType
            });

            await newRecipe.save();

            const populatedRecipe = await CopRecipes.findById(newRecipe._id)
                .populate('idProduct', 'idProduct name')
                .populate('categoryType', 'idCategory name');

            res.status(201).json({
                success: true,
                message: 'Receta creada exitosamente',
                data: populatedRecipe
            });
        } catch (error) {
            if (error.code === 11000) {
                return res.status(400).json({
                    success: false,
                    message: 'Ya existe una receta con esta versión de categoría de producto'
                });
            }
            res.status(500).json({
                success: false,
                message: 'Error al crear la receta',
                error: error.message
            });
        }
    }

    // Actualizar una receta existente
    static async updateRecipe(req, res) {
        try {
            const { idProduct, categoryType, ...recipeData } = req.body;

            // Validar que el producto existe si se está actualizando
            if (idProduct) {
                const product = await CopProduct.findById(idProduct);
                if (!product) {
                    return res.status(400).json({
                        success: false,
                        message: 'El producto especificado no existe'
                    });
                }
            }

            // Validar que la categoría existe si se está actualizando
            if (categoryType) {
                const category = await CopCategory.findById(categoryType);
                if (!category) {
                    return res.status(400).json({
                        success: false,
                        message: 'La categoría especificada no existe'
                    });
                }
            }

            const updatedRecipe = await CopRecipes.findByIdAndUpdate(
                req.params.id,
                {
                    ...recipeData,
                    ...(idProduct && { idProduct }),
                    ...(categoryType && { categoryType })
                },
                { new: true, runValidators: true }
            ).populate('idProduct', 'idProduct name')
             .populate('categoryType', 'idCategory name');

            if (!updatedRecipe) {
                return res.status(404).json({
                    success: false,
                    message: 'Receta no encontrada'
                });
            }

            res.json({
                success: true,
                message: 'Receta actualizada exitosamente',
                data: updatedRecipe
            });
        } catch (error) {
            if (error.code === 11000) {
                return res.status(400).json({
                    success: false,
                    message: 'Ya existe una receta con esta versión de categoría de producto'
                });
            }
            res.status(500).json({
                success: false,
                message: 'Error al actualizar la receta',
                error: error.message
            });
        }
    }

    // Eliminar una receta (soft delete)
    static async deleteRecipe(req, res) {
        try {
            const recipe = await CopRecipes.findByIdAndUpdate(
                req.params.id,
                { isActive: false },
                { new: true }
            );
            
            if (!recipe) {
                return res.status(404).json({
                    success: false,
                    message: 'Receta no encontrada'
                });
            }

            res.json({
                success: true,
                message: 'Receta eliminada exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al eliminar la receta',
                error: error.message
            });
        }
    }
}

export default CopRecipesController; 