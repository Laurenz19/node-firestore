import express, { Request, Response } from 'express';
import currenciesRoutes from './routes/currenciesRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api', currenciesRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
 console.log(`server is running on port ${PORT}`)
});
