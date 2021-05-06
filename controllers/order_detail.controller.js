const OrderDetail = require('../models/order_detail.model');

const createOrderDetail = async (order_detail) => {
    const orderDetail = new OrderDetail(order_detail);
    const result = await orderDetail.save();
    return result._id;
}

module.exports = {createOrderDetail};