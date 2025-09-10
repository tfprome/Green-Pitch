import mongoose from "mongoose"
import wishmodel from "../models/wishmodel.js"
const ObjectId=mongoose.Types.ObjectId

export const addwishservice=async(req,res)=>{
    const productid=req.params.id
    const userid=req.UserID
    //console.log(productid,userid)
    try{
        const exists = await wishmodel.findOne({ userid, productid });
        if (exists) {
          return res.status(400).json({ message: "Product already in wishlist" });
        }
         const data=await wishmodel.create({productid,userid})
         if(!data)
          return  res.status(401).json('could not create wish')
        res.status(200).json('wish created')
    }
    catch(e){
        console.error('server error in add wish',e)
    }
}

export const readwishservice=async(req,res)=>{
   try{
    const userid=new ObjectId(req.UserID)
    //console.log(userid)
    const matchstage={$match:{userid:userid}}
    //console.log(matchstage)

    const JoinStageProduct={$lookup:
        {
            from:'products',
            localField:'productid',
            foreignField:'_id',
            as:'product'
        }
    }
    let unwindStageproduct = { $unwind: '$product' }

    let data=await wishmodel.aggregate([
        matchstage,JoinStageProduct,unwindStageproduct
    ])
    //console.log(data)
    res.status(200).json({'message':'wish data sent',data})
   }
   catch(e){
    res.status(500).json('server error while reading wish data',e)
   }
}

export const removewishservice=async(req,res)=>{
      try{
        const wishid=req.params.id
        const data=await wishmodel.deleteOne({_id:wishid})
        if(data)
            return res.status(200).json('wish item deleted')
        return res.status(402).json('couldnot delete')
      }
      catch(e){
           console.error('server error while deleting wish data:',e)
      }
}