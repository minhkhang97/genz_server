var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var order = new Schema({
    contact: {
        fullname: {
            type: String
        },
        phone: {
            type: String
        },
        address: {
            city: {
                type: String
            },
            district: {
                type: String
            },
            village: {
                type: String
            },
            specific_address: {
                type: String
            }
        }
    },
    order_details: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'order_detail'
    }],
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'customer'
    },
    status: [{
        code: {
            type: String,
            default: '001',
        },
        msg: {
            type: String,
            default: 'cho xac nhan',
        },
        time: {
            type: Date,
            default: Date.now,
        }
    }],

    //ai la nguoi xac nhan don hang
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        //require: true,
    },
    totalPrice: {
        type: Number
    },
    totalQuantity: {
        type: Number
    },
});

const Order = mongoose.model('order', order);

module.exports = Order;