import express from 'express';
import Product from '../models/products.js';
const router = express.Router();

router.get('/products', async (req, res) => {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});


router.post('/product', async (req, res) => {
	try {
		const { id, brand, model, price, stock, offer, tax, category } = req.body;

		let finalPrice = Number(price);

		if (offer === true) {
			finalPrice = 0;
		} else if (tax === true) {
			finalPrice = Number((finalPrice * 1.15).toFixed(2));
		}

		const product = new Product({
			id,
			brand,
			model,
			price: finalPrice,
			stock,
			offer: Boolean(offer),
			tax: Boolean(tax),
			category
		});

		const created = await product.save();
		res.status(201).json(created);
	} catch (err) {
		if (err.code === 11000) {
			return res.status(409).json({ message: 'id ya existe', details: err.keyValue });
		}
		res.status(400).json({ message: err.message });
	}
});

export default router;
