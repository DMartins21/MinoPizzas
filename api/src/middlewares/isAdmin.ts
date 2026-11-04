import {Request, Response, NextFunction} from 'express';
import { db } from '../database/db';

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
    const user_id = req.user_id;

    const user = await db.orm.public.User.where({
        id: user_id
    }).first();
    
    if(!user || !user_id){
        return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    if(user.role !== "ADMIN"){
        return res.status(403).json({ error: 'Acesso negado' });
    }

    next();
}