import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
    {
        id: { type: Number, required: true, unique: true },
        brand: { type: String, required: true },
        model: { type: String, required: true },
        price: { type: Number, required: true },
        stock: { type: Number, required: true },
        offer: { type: Boolean, default: false },
        tax: { type: Boolean, default: false },
        category: { type: String }
    },
    {
        collection: 'Products'
    }
);

export default mongoose.model('Product', productSchema);