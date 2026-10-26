import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload {
    sub: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction)
{
    const isAuth = req.headers.authorization;
    if(!isAuth)
        return res.status(401).json({ error: 'Token Não fornecido!' })
    
    const [, token] = isAuth.split(" ");

    try {
    
        const { sub } = verify(token!, process.env.JWT_SECRET as string) as Payload;

        req.user_id = sub;
        
        return next()

    } catch (error) {
        res.status(401).json({
            error: 'Token Inválido!'
        })
    }
    
    return next();
}