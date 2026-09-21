import { Order } from '../models/orderModel.js';
import { foodItems } from '../models/foodModel.js';

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json({ message: 'Orders fetched successfully', orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Unable to fetch orders', error });
    }
};

export const getCart = async (req, res) => {
    try {
        const userIdentifier = req.user._id;
        let cart = await Order.findOne({ user: userIdentifier, status: 'Cart' });
        
        if (!cart) {
            cart = { items: [], total: 0 };
        }
        res.status(200).json({ cart });
    } catch (error) {
        res.status(500).json({ message: 'Unable to fetch cart', error });
    }
};

export const addToCart = async (req, res) => {
    try {
        const { foodId } = req.body;
        const userIdentifier = req.user._id;

        const food = await foodItems.findById(foodId);
        if (!food) {
            return res.status(404).json({ message: 'Food item not found' });
        }

        let order = await Order.findOne({ user: userIdentifier, status: 'Cart' });

        if (!order) {
            const lastOrder = await Order.findOne().sort({ createdAt: -1 });
            let nextOrderId = '1000';
            if (lastOrder && !isNaN(parseInt(lastOrder.order_id))) {
                nextOrderId = (parseInt(lastOrder.order_id) + 1).toString();
            }

            order = new Order({
                order_id: nextOrderId,
                user: userIdentifier,
                name: req.user.name,
                phone: req.user.phone,
                items: [],
                total: 0
            });
        }

        const existingItemIndex = order.items.findIndex(item => item.foodId.toString() === foodId);
        if (existingItemIndex > -1) {
            order.items[existingItemIndex].quantity += 1;
        } else {
            order.items.push({
                foodId: food._id,
                name: food.name,
                price: food.price,
                quantity: 1
            });
        }

        order.total = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        await order.save();

        res.status(200).json({ message: 'Added to cart', cart: order });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: 'Unable to add to cart', error });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const { foodId } = req.body;
        const userIdentifier = req.user._id;

        let order = await Order.findOne({ user: userIdentifier, status: 'Cart' });
        if (!order) return res.status(404).json({ message: 'Cart not found' });

        const existingItemIndex = order.items.findIndex(item => item.foodId.toString() === foodId);
        if (existingItemIndex > -1) {
            order.items[existingItemIndex].quantity -= 1;
            if (order.items[existingItemIndex].quantity <= 0) {
                order.items.splice(existingItemIndex, 1);
            }
        }

        if (order.items.length === 0) {
            await Order.deleteOne({ _id: order._id });
            return res.status(200).json({ message: 'Cart is empty and deleted', cart: { items: [], total: 0 } });
        }

        order.total = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        await order.save();

        res.status(200).json({ message: 'Removed from cart', cart: order });
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ message: 'Unable to remove from cart', error });
    }
};


export const checkout = async (req, res) => {
    try {
        const { name, phone, address, payment_method } = req.body;
        const userIdentifier = req.user._id;

        let order = await Order.findOne({ user: userIdentifier, status: 'Cart' });
        if (!order || order.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        order.name = name;
        order.phone = phone;
        order.address = address;
        order.payment_method = payment_method;
        order.status = 'Pending';
        await order.save();

        res.status(200).json({ message: 'Order placed successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Unable to checkout', error });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Unable to delete order', error });
    }
};
