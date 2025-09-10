import mongoose from "mongoose";

const sliderschema=new mongoose.Schema({
    buttondata:{type:String,required:true},
    headline:{type:String,required:true},
    message:{type:String,required:true},
    image:{type:String,required:true}
})

const Slider=mongoose.model('sliders',sliderschema)
export default Slider;