import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Product from './src/models/product.js';

const app = express();

app.use(express.json());

const PORT = 5000;

const connectMongoDB = async () =>{
    const conn = await mongoose.connect(process.env.MONGODB_URI)
     if (conn) {
        console.log('MongoDB connected successfully');   
     }
 };
 connectMongoDB();

 //find all data
 app.get('/products', async (req, res) =>{

    const products = await Product.find()

    res.json({
       success: true,
       data: products,
       massage: 'successfully fetched all students',
    })
});
 
//Add Post request
app.post('/product', async (req, res) =>{
    const {name, description, price, productimg, brand} = req.body;

    if (!name) {
      return res.json({
            success:false,
            message: 'Name is required',
        })
    }

    if (!description) {
        return res.json({
              success:false,
              message: 'Description is required',
          })
      }

      if (!price) {
        return res.json({
              success:false,
              message: 'Price is required',
          })
      }

      if (!productimg) {
        return res.json({
              success:false,
              message: 'Productimg is required',
          })
      }

      if (!brand) {
        return res.json({
              success:false,
              message: 'Brand is required',
          })
      }

   const prod = new Product({
     name:name,
     description:description,
     price: price,
     productimg:productimg,
     brand:brand,
   });

   const savedProduct = await prod.save();

    res.json({
        success: true,
        data:savedProduct,
        message: 'Successfully added new product',
    })
});
 
//Find Get request
app.get('/product', async (req, res) => {
    const {name} = req.query;
    
    const product = await Product.findOne({name:name});
 
    res.json({
     success:true,
     data: product,
     message: 'Successfully fetched  product',
    })
 });

app.listen(PORT, () =>{
    console.log(` Server running on port ${PORT}`);
});
