import mongoose from "mongoose";

const WishSchema=new mongoose.Schema({
         productid:{type:mongoose.Schema.Types.ObjectId,required:true},
         userid:{type:mongoose.Schema.Types.ObjectId,required:true}
})

const wishmodel=mongoose.model('wishes',WishSchema)
export default wishmodel;