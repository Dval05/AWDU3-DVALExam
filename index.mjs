import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import productsRoutes from './routes/productsRoutes.js';

const port = 4002;
const app = express();

mongoose.connect('mongodb+srv://Danna:Danna@cluster0.ravjkye.mongodb.net/DannaStore');

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('System connected to MongoDb Database'));

app.use(cors());
app.use(express.json());

app.use('/computerstore', productsRoutes);

app.listen(port, () => {
    console.log(`Danna Computers Store Server is running on port --> ${port}`);
});

export default app;