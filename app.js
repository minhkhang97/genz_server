const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const productRouter = require('./routes/product.router');
const categoryAdminRouter = require('./routes/admin.category.router');
const orderRouter = require('./routes/order.router');
const uploadRouter = require('./routes/upload');

const applyPassport = require('./utils/passport');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
applyPassport(passport);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/admin/categories', categoryAdminRouter);
app.use('/orders', orderRouter);
app.use('/upload', uploadRouter);


module.exports = app;
