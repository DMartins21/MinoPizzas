import { Request, Response } from 'express';
import { UserService } from '../services/userService';

class UserController {
    async newUser(req: Request, res: Response) {
        
        const {name, email, password} = req.body;
        console.log({ name, email, password });
        
        const userService = new UserService();

        const user = await userService.createUser();
        
        res.json({ message: user });
    }

    async myUser(req, res){
        console.log('Bem Vindo a página inicial do usuário');
        
        const userService = new UserService();
        const user = await userService.myUser();

        return res.json({ message: user })
    }
}

export { UserController };