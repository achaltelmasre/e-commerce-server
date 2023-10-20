import express from 'express';
import mongoose,{model,Schema} from 'mongoose';

const app = express();
app.use(express.json());

const PORT = 5000;

const MONGODB_URL = 'mongodb+srv://achaltelmasre:Achal98@achal.ehzxt9b.mongodb.net/e-commerce';

const connectedMongoDB = async () => {
   const conn =  await mongoose.connect(MONGODB_URL)
    if (conn) {
        console.log('mongoDB connected successfully.');
    }
};
connectedMongoDB();

app.get('/products', async (req,res) =>{
    const products = await product.find()
    res.json({
        success:true,
        data:products,
        message: "Successfully get details of product"
    })
});

app.post('/product', async (req,res) =>{
    const {name, description,price,productimg,brand} = req.body;

    const product = new product ({
        name:name,
        description:description,
        price:price,
        productimg:productimg,
        brand:brand
    })

    const saveproduct = await product.save();
    res.json({
        success:true,
        data:saveproduct,
        message: 'Successfully added new product',
    })
});

app.get('/product', async (req,res) =>{
    const {name} = req.query;

    const product = await product.findbox({name:name})
    res.json({
        success: true,
        data:product,
        massage: "Get details of products"

    })
})

app.listen(PORT, () => {
    console.log(`Server is runing on port ${PORT}.`);
});

