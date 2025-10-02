require('dotenv').config();
const express = require('express');

const dotenv = require('dotenv');
const connectDB = require('./config/db');

const authRouter = require('./routes/auth.router');
const accountRouter = require('./routes/account.router');

// Load env
dotenv.config();

// Kết nối DB
connectDB();

// Khởi tạo app
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/admin/accounts', accountRouter);

// Start server

const { swaggerUi, swaggerSpec } = require('./swagger');

// Đường dẫn để truy cập tài liệu Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ...existing code...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});