import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    brandname: {type:String,required:true},
    branddesc: {type:String,required:true},
    brandprice: {type:String,required:true},
    //teamname: {type:String},
    brandstar:{type:String,required:true},
    brandID: {type:mongoose.Schema.Types.ObjectId},
    categoryID: {type:mongoose.Schema.Types.ObjectId},
    brandimg: {type:String,required:true}
})

const products=mongoose.model('products',productSchema)
export default products;