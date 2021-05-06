var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var user = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    create_at: {
        type: String
    }
});

const User = mongoose.model('user', user);

module.exports = User;