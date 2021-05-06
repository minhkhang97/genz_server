const Order = require("../models/order.model");
const OrderDetail = require("../models/order_detail.model");
//order: order_detail

const { createOrderDetail } = require("../controllers/order_detail.controller");

//dat hang(customer)
const createOrder = async (order, customer = null) => {
  //order: {du het cac cai trong model roi}
  const { order_detail, totalQuantity, totalPrice, status, contact } = order;
  console.log(order_detail, status, contact);
  const orderDetailIds = await Promise.all(
    order_detail.map(async (el) => await createOrderDetail(el))
  );
  const orderNew = new Order({
    order_detail: orderDetailIds,
    totalQuantity,
    totalPrice,
    status,
    contact,
    customer,
  });
  const result = await orderNew.save();
  return result;
};

//xac nhan don hang(admin)
const confirmOrder = async (idOrder, user) => {
  const result = Order.updateMany(
    { _id: idOrder },
    {
      $push: { status: { code: "002", msg: "da xac nhan", time: Date.now() } },
      user,
    },
    { new: true }
  );
  return result;
};

//huy don hang(customer)
const cancelOrder = async (idOrder) => {
  const statusNew = {
    code: "003",
    msg: "khach hang huy don hang",
    time: Date.now(),
  };
  //kiem tra xem da huy hay chua
  const orderAfterUpdate = await Order.findOneAndUpdate(
    { _id: idOrder },
    { $push: { status: statusNew } },
    { new: true }
  );
  return orderAfterUpdate;
};

module.exports = { createOrder, cancelOrder, confirmOrder };
