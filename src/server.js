const express = require("express");
const cors = require('cors');
require('dotenv').config();

const UserController = require("./controllers/userController.js");
const sellerRouter = require('./routes/sellerRouter.js');
const administratorRouter = require('./routes/adminRouter.js');
const clientRouter = require('./routes/clientRouter.js');
const categoryRouter = require('./routes/categoryRouter.js');
const productRouter = require('./routes/productsRouter.js');
const saleRouter = require('./routes/saleRouter.js');

const app = express();

const userController = new UserController();
const options = {
  origin:'http://127.0.0.1:5500'
}

app.use(cors(options));
app.use('/administrator', administratorRouter);
app.use('/seller', sellerRouter);
app.use('/client', clientRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/sale', saleRouter);

app.post("/users", express.json() ,userController.handle);

app.listen(process.env.PORT, () => console.log(`Server is running on PORT ${process.env.PORT}`));

