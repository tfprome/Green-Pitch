import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import upload from './middleware/multermiddleware.js'
import path from 'path'
import router from './router/routes.js'
import products from './models/productmodel.js'

dotenv.config();


const app=express()
app.use(express.json());
app.use(cors())
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use('/',router)




app.post('/products',upload.single('brandimg') ,async(req,res)=>{
    const {brandname,branddesc,brandprice,brandstar,brandID,categoryID}=req.body
    const brandimg=req.file? `/uploads/${req.file.filename}`:''
    try{
        const product=await products.create({brandname,branddesc,brandprice,brandstar,brandID,categoryID,brandimg})
        console.log('product created',product)
    }
    catch(e){
        console.error('slider failed',e)
    }
})

// app.post('/brand',upload.single('brandimg'),async(req,res)=>{
//        const {brandname}=req.body
//        const brandimg=req.file?`/uploads/${req.file.filename}`: '';
//        try{
//         const Brands=await brand.create({brandname,brandimg})
//         .then(console.log('brands'))
//        }
//        catch(e){
//            console.log('error',e)
//        }
// })

// app.get('/slider',async(req,res)=>{
//     let data=await Slider.find()
//     //console.log(data)
//     res.status(200).json(data)
// })


// app.get('/brand',async(req,res)=>{
//     const data=await brand.find();
//     res.status(200).json(data)
// })

// app.get('/team',async(req,res)=>{
//     const data=await teams.find();
//     res.status(200).json(data)
// })



mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

//mongodump --uri="mongodb://localhost:27017/test" --out=./backup
//mongorestore --uri="mongodb+srv://tfprome:tf123@cluster0.pjdthzl.mongodb.net/test" ./backup/test

