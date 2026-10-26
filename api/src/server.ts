import cors from 'cors';
import 'dotenv/config'
import express, { Response, Request, NextFunction } from 'express';
import { route } from './routes/routes';
 
const app = express();

app.use(express.json());
app.use(cors());
app.use(route);

app.use(( error: Error, req: Request, res: Response, next: NextFunction ) => {
    if(error instanceof Error){
        return res.status(400).json({
            message: error.message,
        });
    }

    return res.status(500).json({
        error: 'Internal Server Error'
    });
})

const port = process.env.PORT! || 5300;

app.listen(port, () => {
    console.log(`Acesse: http://localhost:${port}`)
})