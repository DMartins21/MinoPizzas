import { Request, Response, Router } from 'express';
import { UserController } from '../controllers/userController';
import { validateSchema } from '../middlewares/validatorSchema';
import { createUserSchema } from '../schemas/userSchema';

const route = Router();

route.post('/users', validateSchema(createUserSchema), new UserController().newUser);
route.get('/users/myUser', new UserController().myUser)

export { route };