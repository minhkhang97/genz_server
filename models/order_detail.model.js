var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var order_detail = new Schema({
    quantity: {
        type: Number
    },

    //nen luu lai gia san pham tai luc dat mua, vi co the o thoi diem khac gia thay doi thi hoi kho khan
    price: {
        type: Number,
    },
    totalPrice: {
        type: Number
    },
    product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'product'
    }
});

const OrderDetail = mongoose.model('order_detail', order_detail);

module.exports = OrderDetail;