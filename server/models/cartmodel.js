import mongoose from "mongoose";

const CartSchema=new mongoose.Schema(
    {
       ProductID:{type:mongoose.Schema.Types.ObjectId,required:true},
       quantity:{type:Number,required:true},
       UserID:{type:mongoose.Schema.Types.ObjectId,required:true},
       size:{type:String,required:true},
       price:{type:Number,required:true}
    }
)

const cartmodel=mongoose.model('carts',CartSchema)
export default cartmodel;