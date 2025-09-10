import mongoose from "mongoose";
import products from "../models/productmodel.js";
const ObjectId = mongoose.Types.ObjectId


export const listbycategoryservice = async (req, res) => {
    //console.log('test')
    try {

        const CategoryID = new ObjectId(req.params.id)
        const MatchStage = { $match: { categoryID: CategoryID } }

        const JoinwithBrandStage = {
            $lookup: {
                from: 'brands',
                localField: 'brandID',
                foreignField: '_id',
                as: 'brand'
            }
        };

        const JoinwithCategoryStage = {
            $lookup: {
                from: 'categories',
                localField: 'categoryID',
                foreignField: '_id',
                as: 'category'
            }
        };

        const unwindbrandstage = { $unwind: '$brand' }
        const unwindteamstage = { $unwind: '$category' }

        const data = await products.aggregate([
            MatchStage,
            JoinwithBrandStage,
            JoinwithCategoryStage,
            unwindbrandstage,
            unwindteamstage
        ]);
        res.status(200).json({ 'message': 'aggregation successfull', data: data })
        //console.log(data)
    }
    catch (e) {
        res.status(404).json({ 'message': 'error during aggregation' })
    }
}


export const listbybrandservice = async (req, res) => {
    //console.log('test')
    try {

        const BrandID = new ObjectId(req.params.id)
        //console.log(BrandID)
        const MatchStage = { $match: { brandID: BrandID } }

        const JoinwithBrandStage = {
            $lookup: {
                from: 'brands',
                localField: 'brandID',
                foreignField: '_id',
                as: 'brand'
            }
        };

        const JoinwithCategoryStage = {
            $lookup: {
                from: 'categories',
                localField: 'categoryID',
                foreignField: '_id',
                as: 'category'
            }
        };

        const unwindbrandstage = { $unwind: '$brand' }
        const unwindcategorystage = { $unwind: '$category' }

        const data = await products.aggregate([
            MatchStage,
            JoinwithBrandStage,
            JoinwithCategoryStage,
            unwindbrandstage,
            unwindcategorystage
        ]);
        res.status(200).json({ 'message': 'aggregation successfull', data: data })
        //console.log(data)
    }
    catch (e) {
        res.status(404).json({ 'message': 'error during aggregation' })
    }
}

export const detailsService = async (req, res) => {
    try {
        const id = req.params.id
        //console.log(id);
        const data = await products.findById(id)
        res.status(200).json({ 'message': 'data found', data: data })
    }
    catch (e) {
        res.status(401).json({ 'message': 'error while searching for data', e })
    }
}


export const productlistbykeyword = async (req, res) => {
    try {
        const value = req.params.value || '';
        const regex = { $regex: value, $options: 'i' }; 

        const SearchParams = [{ brandname: regex },{ teamname: regex }]
        const SearchQuery = { $or: SearchParams };
        //console.log(SearchParams)
        const data = await products.aggregate([
            { $match: SearchQuery },
            {
                $lookup: {
                    from: 'brands',
                    localField: 'brandID',
                    foreignField: '_id',
                    as: 'brand',
                },
            },
            { $unwind: '$brand' },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'categoryID',
                    foreignField: '_id',
                    as: 'category',
                },
            },
            { $unwind: '$category' },
            {
                $project: {
                    'brand._id': 0,
                    'category._id': 0,
                    'brandID': 0,
                    'categoryID': 0
                },
            },
        ]);
       // console.log(data)
        res.status(200).json({ status: 'success', data });
    } catch (e) {
        res.status(500).json({ status: 'failed', error: e.message });
    }
};

export const getproducts=async(req,res)=>{
    try{
        const data=await products.find()
        return res.status(200).json(data)
    }
    catch(e){
         return res.status(500).json('server error in get products')
    }
}