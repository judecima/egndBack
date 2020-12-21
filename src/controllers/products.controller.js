import Product from '../models/products';

export const createProduct = async (req, res) => {
	const { nombre, categoria, precio, imgUrl } = req.body;
	const newProducto = Product({ nombre, categoria, precio, imgUrl });
	const productSave = await newProducto.save();
	res.status(201).json(productSave);
};

export const getProducts = async (req, res) => {
	const products = await Product.find();
	res.json(products);
};

export const getProductById = async (req, res) => {
	const producto = await Product.findById(req.params.productId);
	res.status(200).json(producto);
};

export const updateProductById = async (req, res) => {
	const productoActualizado = await Product.findByIdAndUpdate(req.params.productId, req.body, {
		new: true,
	});
	res.status(204).json(productoActualizado);
};
export const deleteProductById = async (req, res) => {
	const productoEliminado = await Product.findByIdAndDelete(req.params.productId);
	res.status(204).json();
};
