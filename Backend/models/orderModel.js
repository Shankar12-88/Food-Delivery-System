import mongoose from "mongoose"

const orderItemSchema = new mongoose.Schema({
    foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
});

const orderSchema = new mongoose.Schema({
    order_id: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: String, // Can be user email, guest ID, or user Object ID
        required: true
    },
    name: {
        type: String, // Customer name (optional for cart phase)
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    payment_method: {
        type: String,
        enum: ['esewa', 'khalti', 'cash'],
    },
    status: {
        type: String,
        enum: ['Cart', 'Pending', 'Delivered', 'Cancelled'],
        default: 'Cart'
    },
    items: [orderItemSchema],
    total: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true })

export const Order = mongoose.model('Order', orderSchema)