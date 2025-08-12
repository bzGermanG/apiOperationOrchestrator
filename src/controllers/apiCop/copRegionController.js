import Region from '../../model/apiCop/copRegion.js';


async function getAllRegions(req, res) {
    try {
        const copRegions = await Region.find().select('idRegion name');
        
        // Transformar la respuesta al formato deseado
        const formattedRegions = copRegions.map(region => ({
            idRegion: region.idRegion,
            name: region.name
        }));

        res.status(200).json(formattedRegions);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Error al obtener las regions: ' + error.message
        });
    }
}


// Obtener todas las regiones
async function getRegions(req, res) {
    try {
        const regions = await Region.find();
        res.json(regions);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las regiones', error: error.message });
    }
}

// Obtener una región por ID
async function getRegionById(req, res) {
    try {
        const region = await Region.findOne({ idRegion: req.params.id });
        if (!region) {
            return res.status(404).json({ message: 'Región no encontrada' });
        }
        res.json(region);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la región', error: error.message });
    }
}

// Crear una nueva región
async function createRegion(req, res) {
    try {
        const { name, idRegion } = req.body;
        const region = new Region({ name, idRegion });
        const savedRegion = await region.save();
        res.status(201).json(savedRegion);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear la región', error: error.message });
    }
}

// Actualizar una región
async function updateRegion(req, res) {
    try {
        const { name } = req.body;
        const region = await Region.findOneAndUpdate(
            { idRegion: req.params.id },
            { name },
            { new: true, runValidators: true }
        );
        if (!region) {
            return res.status(404).json({ message: 'Región no encontrada' });
        }
        res.json(region);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar la región', error: error.message });
    }
}

// Eliminar una región
async function deleteRegion(req, res) {
    try {
        const region = await Region.findOneAndDelete({ idRegion: req.params.id });
        if (!region) {
            return res.status(404).json({ message: 'Región no encontrada' });
        }
        res.json({ message: 'Región eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la región', error: error.message });
    }
} 

export {
    getRegions,
    getRegionById,
    createRegion,
    updateRegion,
    deleteRegion,
    getAllRegions
};