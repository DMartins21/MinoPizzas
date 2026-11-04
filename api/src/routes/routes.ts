import { Request, Response, Router } from 'express';
import { UserController } from '../controllers/userController';
import { CategoryController } from '../controllers/categoryController';
import { validateSchema } from '../middlewares/validatorSchema';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { isAdmin } from '../middlewares/isAdmin';
import { createUserSchema } from '../schemas/userSchema';
import { authUser } from '../schemas/userSchema';
import { createCategorySchema } from '../schemas/categorySchema';

const route = Router();

route.post('/users', validateSchema(createUserSchema), new UserController().newUser);

route.get('/users/myUser', isAuthenticated, new UserController().myUser)

route.post('/session', validateSchema(authUser), new UserController().authUser)

route.post('/category', isAuthenticated, isAdmin, validateSchema(createCategorySchema), new CategoryController().newCategory);

export { route };