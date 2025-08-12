import CopTier from '../../model/apiCop/copTier.js';
import { v4 as uuidv4 } from 'uuid';

// Obtener todos los CopTiers sin filtros
async function getAllCopTiers(req, res) {
    try {
        const copTiers = await CopTier.find().select('idTier sku displayName supportedUsers');
        
        // Transformar la respuesta al formato deseado
        const formattedTiers = copTiers.map(tier => ({
            idTier: tier.idTier,
            sku: tier.sku,
            displayName: tier.displayName,
            supportedUsers: tier.supportedUsers
        }));

        res.status(200).json(formattedTiers);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Error al obtener los CopTiers: ' + error.message
        });
    }
}

// Obtener CopTiers con filtros y paginación
async function getCopTiersWithFilters(req, res) {
    try {
        const { 
            page = 1, 
            limit = 10, 
            sort = 'createdAt', 
            order = 'desc',
            isActive,
            sku,
            displayName 
        } = req.query;

        // Construir el filtro
        const filter = {};
        if (isActive !== undefined) filter.isActive = isActive === 'true';
        if (sku) filter.sku = { $regex: sku, $options: 'i' };
        if (displayName) filter.displayName = { $regex: displayName, $options: 'i' };

        // Ejecutar la consulta con paginación
        const copTiers = await CopTier.find(filter)
            .sort({ [sort]: order === 'desc' ? -1 : 1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        // Obtener el total de documentos
        const count = await CopTier.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: copTiers,
            pagination: {
                total: count,
                page: parseInt(page),
                pages: Math.ceil(count / limit)
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Error al obtener los CopTiers: ' + error.message
        });
    }
}

// Obtener un CopTier por ID o SKU
async function getCopTierById(req, res) {
    try {
        const { id } = req.params;
        let copTier;

        // Intentar buscar por idTier o SKU
        if (id.match(/^[0-9a-fA-F-]{36}$/)) {
            copTier = await CopTier.findOne({ idTier: id });
        } else {
            copTier = await CopTier.findOne({ sku: id });
        }

        if (!copTier) {
            return res.status(404).json({
                success: false,
                error: 'CopTier no encontrado 2GJ'
            });
        }

        res.status(200).json({
            success: true,
            data: copTier
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Error al obtener el CopTier: ' + error.message
        });
    }
}

// Crear un nuevo CopTier
async function createCopTier(req, res) {
    try {
        // Generar un nuevo idTier
        const idTier = uuidv4();
      
        // Crear el nuevo CopTier con el idTier generado
        const copTier = await CopTier.create({
            ...req.body,
            idTier
        });

        res.status(200).json({
            success: true,
            data: copTier
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: 'Error al crear el CopTier: ' + error.message
        });
    }
}

// Actualizar un CopTier
async function updateCopTier(req, res) {
    try {
        const { id } = req.params;
        let copTier;

        // Eliminar idTier del body si se intenta actualizar
        if (req.body.idTier) {
            delete req.body.idTier;
        }

        // Buscar y actualizar el CopTier por idTier
        copTier = await CopTier.findOneAndUpdate(
            { idTier: id },
            { ...req.body, idTier: id }, // Incluir el idTier en la actualización
            {
                new: true,
                runValidators: true
            }
        );

        if (!copTier) {
            return res.status(404).json({
                success: false,
                error: 'CopTier no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: copTier
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: 'Error al actualizar el CopTier: ' + error.message
        });
    }
}

// Eliminar un CopTier (soft delete)
async function deleteCopTier(req, res) {
    try {
        const copTier = await CopTier.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );

        if (!copTier) {
            return res.status(404).json({
                success: false,
                error: 'CopTier no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'CopTier desactivado exitosamente',
            data: copTier
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Error al eliminar el CopTier: ' + error.message
        });
    }
}

// Restaurar un CopTier eliminado
async function restoreCopTier(req, res) {
    try {
        const copTier = await CopTier.findByIdAndUpdate(
            req.params.id,
            { isActive: true },
            { new: true }
        );

        if (!copTier) {
            return res.status(404).json({
                success: false,
                error: 'CopTier no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'CopTier restaurado exitosamente',
            data: copTier
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Error al restaurar el CopTier: ' + error.message
        });
    }
}

export {
    getAllCopTiers,
    getCopTiersWithFilters,
    getCopTierById,
    createCopTier,
    updateCopTier,
    deleteCopTier,
    restoreCopTier
}; 