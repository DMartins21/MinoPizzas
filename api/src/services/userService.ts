import { db } from '../database/db';
const bcryptJs = require('bcryptjs');
import { sign } from 'jsonwebtoken'

interface CreateUserProps{
    name: string;
    email: string;
    password: string;
}

interface LoginUserProps{
    email: string;
    password: string;
}

class UserService {
    async createUser({ name, email, password }: CreateUserProps){

        const userExist = await db.orm.public.User.where({
            email: email
        }).first();

        if(userExist)
            throw new Error('Usuário já cadastrado');

        const passwordHash = await bcryptJs.hashSync(password, 12);

        const user = await db.orm.public.User.create({
            name: name,
            email: email,
            password: passwordHash,
        });
        
        const createdUser = {
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt
        }

        return createdUser;
    }

    async login({ email, password }: LoginUserProps){

        const user = await db.orm.public.User.where({
            email: email
        }).first();

        if(!user)
            throw new Error('Usuário ou senha inválidos');

        const passwordMatch = await bcryptJs.compareSync(password, user.password);
        if(!passwordMatch){
            throw new Error('Usuário ou senha inválidos');
        }

        const jwtSecret = process.env.JWT_SECRET;
        if(!jwtSecret)
            throw new Error();

        const token = sign({
            name: user.name,
            email: user.email
        },
        jwtSecret as string,
        {
            subject: user.id,
            expiresIn: '30d'
        });

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            token: token
        };

    }

    async myUser(user_id: string){
        
        const user = await db.orm.public.User.where({
            id: user_id
        }).first()

        if(!user)
            throw new Error('Usuário Não Cadastrado!')

        const userDetails = {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        };


        return userDetails;
    }
}

export { UserService };