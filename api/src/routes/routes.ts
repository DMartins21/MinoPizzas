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
import { createCategorySchema, getCategoryProducts } from '../schemas/categorySchema';
import { ProductController } from '../controllers/productController';
import { createProductSchema, getProducts, deleteProduct } from '../schemas/productSchema';
import { OrderController } from '../controllers/orderController';
import { createOrder, finishOrder, orderIdSchema, addItemInOrder, removeItemInOrder, sendOrder, deleteOrderSchema } from '../schemas/orderSchema';

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

route.get('/order/detail', isAuthenticated, validateSchema(orderIdSchema) ,new OrderController().OrderDetails);

route.post('/order', isAuthenticated, validateSchema(createOrder), new OrderController().NewOrder);

route.post('/order/addItem', isAuthenticated, validateSchema(addItemInOrder), new OrderController().AddItemsInOrder);

route.put('/order/sendOrder', isAuthenticated, validateSchema(sendOrder) ,new OrderController().SendOrder);

route.put('/order/finish', isAuthenticated, validateSchema(finishOrder), new OrderController().FinishOrder);

route.delete('/order/removeItem', isAuthenticated, validateSchema(removeItemInOrder), new OrderController().RemoveItemInOrder);

route.delete('/order/deleteOrder', isAuthenticated, validateSchema(deleteOrderSchema), new OrderController().DeleteOrder);

export { route };