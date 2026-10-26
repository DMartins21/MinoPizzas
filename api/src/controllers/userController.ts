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

    async authUser(req: Request, res: Response){
        const { email, password } = req.body;

        const authService = new UserService();

        const session = await authService.login({ email, password });

        res.json({ session })
    }

    async myUser(req: Request, res: Response){

        const user_id = req.user_id;

        const userService = new UserService();
        const user = await userService.myUser(user_id);

        res.json( user );
    }
}

export { UserController };