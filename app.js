const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const codeRoutes = require('./routes/codeRoutes');

dotenv.config();

const app = express();
app.use(express.json());

// Conectar a la base de datos
connectDB();

app.use('/api/code', codeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));