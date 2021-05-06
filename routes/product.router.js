const express = require('express');
const passport = require('passport');
const {param, validationResult} = require('express-validator');
const router = express.Router();


const Product = require('../models/product.model');

const {createProduct, updateProduct, findProductByPage, findAllProduct, findOneProduct} = require('../controllers/product.controller');

//cho customer




//cho admin

//bat buoc phai co session false o day
router.get('/', async (req, res) => {
    try{
        const products = await findAllProduct();
        return  res.status(200).json(products);
    }catch (err){
        return res.status(400).json({msg: err});
    }
});

//check gia tri truyen len trc
router.post('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    //
    try{
        const product = await createProduct(req.body, String(req.user._id));
        return res.status(200).json(product);
    }catch (err){
        return res.status(401).json({msg: err});
    }
});


//update by id
router.put('/:id', param('id').exists().withMessage('vui long dien id'), async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({msg: errors});
    }

    //kiem tra xem id co dung khong
    const {id} = req.params;
    try{
        const productNeedUpdate = await Product.findOne({_id: id});
        if(!productNeedUpdate){
            return res.status(400).json({msg: 'san pham khong ton tai'});
        }

        const productAfterUpdate = await updateProduct(id, req.body);
        return  res.status(200).json(productAfterUpdate);
    }
    catch (err){
        return  res.status(401).json({msg: err})
    }

});

module.exports = router;
