var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var product = new Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    discount: {
        type: Number
    },
    introduce: {
        type: String
    },
    description: {
        type: String
    },
    photos: [{
        _id: Schema.Types.ObjectId,
        //dung cho client
        id: String,
        alt: {
            type: String
        },
        url: {
            type: String
        }
    }],
    status: {
        code: {
            type: String
        },
        msg: {
            type: String
        }
    },
    isPublic: {
        type: Boolean
    },
    quantity: {
        type: Number
    },
    properties: [{
        _id: Schema.Types.ObjectId,
        id: String,
        name: {
            type: String
        },
        maxQuantity: {
            type: Number
        },
        isRequire: {
            type: Boolean
        },
        options: [{
            value: {
                _id: Schema.Types.ObjectId,
                id: String,
                type: String
            }
        }],
        minQuantity: {
            type: Number
        }
    }],
    categories: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'category',
    }],
    create_at: {
        type: Date,
        default: Date.now,
        // time: {
        //     type: Date,
        //     default: Date.now,
        // },
        // user: {
        //     type: Schema.Types.ObjectId,
        //     ref: 'user',
        // }
    },
    user: {
        type: Schema.Types.ObjectId,
        //required: true,
        ref: 'user',
    }
});

const Product = mongoose.model('product', product);

module.exports = Product;