import { Request, Response, Router } from 'express';
import { UserController } from '../controllers/userController';
import { validateSchema } from '../middlewares/validatorSchema';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { createUserSchema } from '../schemas/userSchema';
import { authUser } from '../schemas/userSchema';

const route = Router();

route.post('/users', validateSchema(createUserSchema), new UserController().newUser);

route.get('/users/myUser', isAuthenticated, new UserController().myUser)

route.post('/session', validateSchema(authUser), new UserController().authUser)

export { route };