import { email } from 'zod';
import { db } from '../database/db';
const bcryptJs = require('bcryptjs')
interface CreateUserProps{
    name: string;
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
 
        return await user.name;
    }

    async myUsers(){
        const user = await db.orm.public.User.all()

        return user;
    }
}

export { UserService };