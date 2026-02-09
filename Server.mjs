import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4001;

// Configuración de CORS
const corsOptions = {
    origin: process.env.FRONTEND_URL || '*', // En producción, especifica la URL del frontend
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome Danna Server');
});

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
