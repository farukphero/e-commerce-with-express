import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import { ProductRoutes } from './app/modules/product/product.route';
import { OrderRoutes } from './app/modules/orders/order.route';

import globalErrorHandle from './app/middlewares/error-handling';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('E-commerce with express start.');
});

// handle route that is not exist
app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

// handle global error
app.use(globalErrorHandle);
export default app;
