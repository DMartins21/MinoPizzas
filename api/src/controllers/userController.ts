import { Request, Response } from 'express';
import { UserService } from '../services/userService';

class UserController {
    async newUser(req: Request, res: Response) {
        
        const {name, email, password} = req.body;
        console.log({ name, email, password });
        
        const userService = new UserService();

        const user = await userService.createUser( {
            name: name,
            email: email,
            password: password
        } );
        
        res.json({ message: user });
    }

    async myUsers(req: Request, res: Response){
        const userService = new UserService();
        const user = await userService.myUsers();

        return res.json({ message: user })
    }
}

export { UserController };