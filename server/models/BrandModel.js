import mongoose from "mongoose";

const BrandSchema=new mongoose.Schema({
         brandimg:{type:String,required:true},
         brandname:{type:String,required:true}
})

const brand=mongoose.model('brands',BrandSchema)
export default brand;