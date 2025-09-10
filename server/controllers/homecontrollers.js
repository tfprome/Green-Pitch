import Slider from '../models/slidermodel.js'
import brand from '../models/BrandModel.js';
import categories from '../models/Categorymodel.js';
import products from '../models/productmodel.js';


export const Slidercontroller =async(req,res)=>{
    let data=await Slider.find()
    //console.log(data)
    res.status(200).json(data)
}

export const Brandshowcontroller=async(req,res)=>{
    const data=await brand.find();
    res.status(200).json(data)
}

export const Categoryshowcontroller=async(req,res)=>{
    const data=await categories.find();
    res.status(200).json(data)
}

export const teamname= async (req, res) => {
    try {
      const teams = await products.distinct('teamname');
      res.json({ status: 'success', data: teams });
    } catch (e) {
      res.status(500).json({ status: 'failed', error: e.message });
    }
  };
  
export const brandname= async (req, res) => {
    try {
      const brands = await brand.distinct('brandname');
      res.json({ status: 'success', data: brands });
    } catch (e) {
      res.status(500).json({ status: 'failed', error: e.message });
    }
  };
  
export const categoryname= async (req, res) => {
    try {
      const data = await categories.distinct('categoryname');
      res.json({ status: 'success', data });
    } catch (e) {
      res.status(500).json({ status: 'failed', error: e.message });
    }
  };