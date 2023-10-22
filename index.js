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

 //Delete request
app.delete('/product/:_id', async (req,res) =>{
    const { _id } = req.params;

     await Product.deleteOne({ _id:  _id});

    res.json({
        success:true,
        data: {},
        message:`Successfully deleted product with id ${_id}  `,
    })
});

//put student
app.put('/product/:_id', async (req, res) => {
    const { _id } = req.params;
    const { name,  description,  price, productimg, brand } = req.body;
   
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
   
      await Product.updateOne(
   
       {_id:_id},
       {$set: {
           name: name,
           description: description,
           price: price,
           productimg: productimg,
           brand: brand,
       }})
   
       const updatedProduct = await Product.findOne({_id:_id});
   
       res.json({
           success:true,
           data: updatedProduct,
           message: `Successfully update `
       })
 });

 //patch request
 app.patch('/product/:_id', async (req, res) =>{
    const { _id } = req.params;
    const { name, description, price, productimg, brand  } = req.body;

    const product = await Product.findById(_id);

    if(name){
        product.name = name;
    }

    if(description){
        product.description = description;
    }

    if(price){
        product.price = price;
    }

    if(productimg){
        product.productimg = productimg;
    }

    if(brand){
        product.brand  = brand;
    }

    const updatedProduct = await product.save();

  res.json({
    success:true,
    data:updatedProduct,
    message:"update successfully"
  })

});

app.listen(PORT, () =>{
    console.log(` Server running on port ${PORT}`);
});

