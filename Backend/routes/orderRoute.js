import { Router } from 'express';
import { addToCart, removeFromCart, getCart, checkout, getOrders, deleteOrder } from '../controllers/orderController.js';
import verifyJWT from '../middlewares/verifyJWT.js';
import verifyAdmin from '../middlewares/adminVerifyJWT.js';

const orderRouter = Router();

orderRouter.get('/', verifyAdmin, getOrders); // For admin panel
orderRouter.delete('/:id', verifyAdmin, deleteOrder); // Admin cancel/delete
orderRouter.get('/cart', verifyJWT, getCart);
orderRouter.post('/cart/add', verifyJWT, addToCart);
orderRouter.post('/cart/remove', verifyJWT, removeFromCart);
orderRouter.post('/checkout', verifyJWT, checkout);

export default orderRouter;
