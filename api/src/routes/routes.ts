import { Request, Response, Router } from 'express';
import multer from 'multer';
import configure from '../config/multer';
import { UserController } from '../controllers/userController';
import { CategoryController } from '../controllers/categoryController';
import { validateSchema } from '../middlewares/validatorSchema';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { isAdmin } from '../middlewares/isAdmin';
import { createUserSchema } from '../schemas/userSchema';
import { authUser } from '../schemas/userSchema';
import { createCategorySchema } from '../schemas/categorySchema';
import { ProductController } from '../controllers/productController';

const route = Router();
const upload = multer(configure);

//user
route.post('/users', validateSchema(createUserSchema), new UserController().newUser);
route.get('/users/myUser', isAuthenticated, new UserController().myUser)
route.post('/session', validateSchema(authUser), new UserController().authUser)

//category
route.post('/category/create', isAuthenticated, isAdmin, validateSchema(createCategorySchema), new CategoryController().newCategory);
route.get('/category/getAll', new CategoryController().getAllCategoires);

// product
route.post('/product/newProduct', isAuthenticated, isAdmin, upload.single('file') ,new ProductController().create)

export { route };