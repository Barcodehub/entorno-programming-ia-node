const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const codeRoutes = require('./routes/codeRoutes');
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000", // Permitir solo este origen
    credentials: true // Si usas cookies o autenticación
  }));

  
// Conectar a la base de datos
connectDB();

app.use('/api/code', codeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));