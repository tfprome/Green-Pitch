import mongoose, { deleteModel } from 'mongoose';
import cartmodel from './../models/cartmodel.js';
const ObjectId = mongoose.Types.ObjectId

export const addcartservice = async (req, res) => {
    try {
        const UserID = req.UserID
        const reqBody = req.body
        reqBody.UserID = UserID
        //console.log(reqBody)
        const addcart = await cartmodel.create(reqBody)
        //console.log('cart created')
        res.status(200).json({ "message": "cart created" })
    }
    catch (e) {
        console.log('error during cart creation', e)
    }
}

export const readcartsevice = async (req, res) => {
    try {
        const userid = new ObjectId(req.UserID)
        //console.log(userid)
        let matchstage = { $match: { UserID: userid } }

        let JoinStageProduct = {
            $lookup:
            {
                from: 'products',
                localField: 'ProductID',
                foreignField: '_id',
                as: 'product'
            }
        }
        let unwindStageproduct = { $unwind: '$product' }
        let JoinStageBrand = {
            $lookup:
            {
                from: 'brands',
                localField: 'product.brandID',
                foreignField: '_id',
                as: 'brand'
            }
        }
        let unwindStagebrand = { $unwind: '$brand' }
        let JoinStageCategory = {
            $lookup:
            {
                from: 'categories',
                localField: 'product.categoryID',
                foreignField: '_id',
                as: 'category'
            }
        }
        let unwindStagecategory = { $unwind: '$category' }

        let ProjectionStage = {
            $project: {
                'ProductID': 0,
                'UserID': 0,
                '__v': 0,

                'product._id': 0,
                'product.brandID': 0,
                'product.categoryID': 0,
                'product.__v': 0,

                'brand._id': 0,
                'brand.__v': 0,

                'category._id': 0,
                'category.__v': 0
            }
        }

        let data = await cartmodel.aggregate([
            matchstage,
            JoinStageProduct,
            unwindStageproduct,
            JoinStageBrand,
            unwindStagebrand,
            JoinStageCategory,
            unwindStagecategory,
            ProjectionStage
        ])
        //console.log(data)
        res.status(200).json({ "message": "cart data sent from BE", data })
    }
    catch (e) {
        console.error('cant read cartdata:', e)
    }
}

// export const updatecartservice=async(req,res)=>{
//          try{
//               const{quantity,size}=req.body
//              const userid=req.UserID
//              const cartid=req.params.id
//              const updateitem=await cartmodel.findOneAndUpdate(
//                 {_id:cartid,UserID:userid},
//                  {$set:{quantity,size}}
//              )
//             if(!updateitem)
//                 res.status(402).json({'message':'update failed'})
//             if(updateitem)
//                 res.status(200).json({'message':'cart updated',updateitem})
//          }
//          catch(e){
//             console.error("Error updating cart:", e);
//             res.status(500).json({ message: "Server error" });
//          }

// }

export const removecartservice=async(req,res)=>{
    try{
        const id=req.params.id;
        const deleteitem= await cartmodel.findByIdAndDelete(id)
        if (!deleteitem) {
            return res.status(404).json({ message: "No item to delete" });
          }
      
          res.status(200).json({ message: "Deleted successfully", deleteitem });}
    catch(e){
        console.error('server error during delete',e)
    }
}