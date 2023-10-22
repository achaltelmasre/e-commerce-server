import { Schema,model } from "mongoose";


const productSchema = new Schema({
    name:String,
    description:String,
    price:Number,
    productimg:String,
    brand:String,

});

const Product = model('Product', productSchema);

export default Product;