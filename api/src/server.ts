import cors from 'cors';
import 'dotenv/config'
import express from 'express';
import { route } from './routes/routes';
 
const app = express();

app.use(express.json());
app.use(cors());
app.use(route);

const port = process.env.PORT! || 5300;

app.listen(port, () => {
    console.log(`Acesse: http://localhost:${port}`)
})