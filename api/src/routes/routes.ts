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
import { getCategoryProducts } from '../schemas/categorySchema';
import { ProductController } from '../controllers/productController';
import { createProductSchema } from '../schemas/productSchema';
import { getProducts } from '../schemas/productSchema';
import { deleteProduct } from '../schemas/productSchema';
import { OrderController } from '../controllers/orderController';
import { createOrder } from '../schemas/orderSchema';
import { addItemInOrder } from '../schemas/orderSchema';

const route = Router();
const upload = multer(configure);

//user
route.post('/users', validateSchema(createUserSchema), new UserController().newUser);
route.get('/users/myUser', isAuthenticated, new UserController().myUser)
route.post('/session', validateSchema(authUser), new UserController().authUser)

//category
route.post('/category/create', isAuthenticated, isAdmin, validateSchema(createCategorySchema), new CategoryController().newCategory);
route.get('/category/getAll', new CategoryController().getAllCategoires);
route.get('/category/CategoryProducts', isAuthenticated , new CategoryController().getCategoryProducts);

// product
route.post('/product/newProduct', isAuthenticated, isAdmin, upload.single('file') , validateSchema(createProductSchema), new ProductController().create)
route.get('/product/getAll', isAuthenticated, validateSchema(getProducts), new ProductController().getProducts)
route.delete('/product', isAuthenticated, isAdmin, validateSchema(deleteProduct), validateSchema(getCategoryProducts) ,new ProductController().deleteProduct);

//Orders
route.get('/order', isAuthenticated, new OrderController().ListOrders);
route.post('/order', isAuthenticated, validateSchema(createOrder), new OrderController().NewOrder);
route.post('/order/addItem', isAuthenticated, validateSchema(addItemInOrder), new OrderController().AddItemsInOrder);

export { route };