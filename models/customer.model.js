const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const customerSchema = new Schema({
    fullname: {
        type: String,
        lowercase: true,
    },
    email: {
        type: String,
        lowercase: true,
    },
    password: {
        type: String
    },
    username: {
        type: String,
        lowercase: true
    },
    contact: {
        _id: Schema.Types.ObjectId,
        id: String,
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
    create_at: {
        type: Date,
        default: Date.now(),
    }
});

const Customer = mongoose.model('customer', customerSchema);

module.exports = Customer;