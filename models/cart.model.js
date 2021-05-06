const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cartSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'customer'
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'product'
    }],
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'order'
    }]
});

const Cart = mongoose.model('cart', cartSchema);

module.exports = Cart;