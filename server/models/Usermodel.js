import mongoose from 'mongoose'

const UserSchema=new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
})

const usermodel=mongoose.model('users',UserSchema)
export default usermodel;