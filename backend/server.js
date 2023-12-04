import express from 'express';
import connectDB from './config/db.js';
import productsRouter from './routes/productRouters.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import dotenv from "dotenv"
dotenv.config();

connectDB()
const port = process.env.PORT;

const app = express();



app.get('/', (req, res) => {
    res.send('API is running ...')
});

app.use('/api/products', productsRouter);

app.use(errorHandler);
app.use(notFound)
app.listen(port, () => console.log('Server running on port ' + port))