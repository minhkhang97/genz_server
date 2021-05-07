const OrderDetail = require('../models/order_detail.model');

const createOrderDetail = async (order_detail) => {
    //price quantity product totalPrice
    const totalPrice = order_detail.price * order_detail.quantity

    const orderDetail = new OrderDetail({...order_detail, totalPrice});
    const result = await orderDetail.save();
    return result._id;
}

module.exports = {createOrderDetail};