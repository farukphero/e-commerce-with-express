import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.route';

const app: Application = express();

app.use(express.json());
app.use(cors());


app.use("/api/products", ProductRoutes)

app.use((req, res, next)=>{
  res.status(404).json({message: "Route not found."})
})

app.get('/', (req: Request, res: Response) => {
  res.send('E-commerce with express start.');
});

export default app;
