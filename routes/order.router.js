const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {param, validationResult} = require('express-validator');
require('dotenv').config();

const Order = require('../models/order.model');
const OrderDetail = require('../models/order_detail.model');
const Customer = require('../models/customer.model');

const {createOrder, cancelOrder} = require('../controllers/order.controller');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) next();

    try{
        const payload = jwt.verify(token, process.env.SECRET_1);

        if(!payload)  next();

        req.customer = payload.sub;

        next();
    }
    catch (err){
        next();
    }

}

//dat hang
router.post('/', authenticateToken, async (req, res) => {
    //req se gui theo header gan token
    //o day dung jsonwebtoken de lay token chu ko su dung passport

    //req.customer co the undefined hoac khong, co the dung hoac day la id nhap bua vao
    try{
        if(!req.customer){
            //dat hang khong dang nhap
            //req.body: order_detail, customer, (linh tinh: totalQuantity, totalPrice)
            const orderResult = await createOrder(req.body);
            return res.status(200).json(orderResult);
            //create order tai day

        }else{
            //dat hang co dang nhap
            const orderResult = await createOrder(req.body, req.customer);
            return res.status(200).json(orderResult);
        }
    }catch (e){
        return res.status(401).json({mes: e});
    }


});

//huy don hang
router.put('/cancel/:id',async (req, res, next) => {
   const {id} = req.params;
   if(!id){
       return res.status(400).json({mes: 'dien id'});
   }
   try{
       const result = await cancelOrder(id);
       return res.status(401).json(result);
   }catch (e){
       return res.status(401).json({mes: e});
       //next();
   }
});

//xac nhan don hang
router.put('/confirm/:id', async (req, res) => {

});

module.exports = router;