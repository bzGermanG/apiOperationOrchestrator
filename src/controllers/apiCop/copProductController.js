import CopProduct from '../../model/apiCop/copProduct.js';

// Obtener todos los productos
async function getAllProducts(req, res) {
    try {
        const products = await CopProduct.find();
       
        const formattedProducts = products.map(product => ({
            idProduct: product.idProduct,
            name: product.name
        }));

        res.json(formattedProducts);


    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error al obtener los productos', 
            error: error.message 
        });
    }
}

// Obtener un producto por ID
async function getProductById(req, res) {
    try {
        const product = await CopProduct.findOne({ idProduct: req.params.id });
        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: 'Producto no encontrado' 
            });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error al obtener el producto', 
            error: error.message 
        });
    }
}

// Crear un nuevo producto
async function createProduct(req, res) {
    try {
        const { name, idProduct } = req.body;
        const product = new CopProduct({ name, idProduct });
        const savedProduct = await product.save();
        res.status(201).json({
            success: true,
            data: savedProduct
        });
    } catch (error) {
        res.status(400).json({ 
            success: false, 
            message: 'Error al crear el producto', 
            error: error.message 
        });
    }
}

// Actualizar un producto
async function updateProduct(req, res) {
    try {
        const { name } = req.body;
        const product = await CopProduct.findOneAndUpdate(
            { idProduct: req.params.id },
            { name },
            { new: true, runValidators: true }
        );
        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: 'Producto no encontrado' 
            });
        }
        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(400).json({ 
            success: false, 
            message: 'Error al actualizar el producto', 
            error: error.message 
        });
    }
}

// Eliminar un producto
async function deleteProduct(req, res) {
    try {
        const product = await CopProduct.findOneAndDelete({ idProduct: req.params.id });
        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: 'Producto no encontrado' 
            });
        }
        res.json({ 
            success: true, 
            message: 'Producto eliminado exitosamente' 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error al eliminar el producto', 
            error: error.message 
        });
    }
}

export {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}; 