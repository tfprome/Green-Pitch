import mongoose from 'mongoose'

const CategorySchema=new mongoose.Schema({
    categoryname:{type:String,required:true},
    categorylogo:{type:String,required:true}
})
const categories=mongoose.model('categories',CategorySchema)
export default categories;