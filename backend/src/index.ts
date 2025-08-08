import 'dotenv/config';
import express from 'express';
import productsRouter from './api/products';
import settingsRouter from './api/settings';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/settings', settingsRouter);

app.listen(3000, () => {
  console.log('Backend server running on port 3000');
});
