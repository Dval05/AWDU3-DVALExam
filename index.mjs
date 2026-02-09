import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import productsRoutes from './routes/productsRoutes.js';

const port = process.env.PORT || 4002;
const app = express();

const corsOptions = {
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
};

const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://Danna:Danna@cluster0.ravjkye.mongodb.net/DannaStore';
mongoose.connect(mongoUri);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('System connected to MongoDb Database'));

app.use(cors(corsOptions));
app.use(express.json());

// Ruta de prueba en raíz
app.get('/', (req, res) => {
    res.json({ 
        message: 'Danna Computers Store Server is running', 
        endpoints: ['/computerstore/products'],
        port: port
    });
});

app.use('/computerstore', productsRoutes);

app.listen(port, () => {
    console.log(`Danna Computers Store Server is running on port --> ${port}`);
});

export default app;