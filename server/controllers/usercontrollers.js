import dotenv from 'dotenv'
import usermodel from "../models/Usermodel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


dotenv.config()

const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY;

export const signupservice=async(req,res)=>{
    const {name,email,password}=req.body;
    console.log({email,name,password})
    try{
           const existinguser=await usermodel.findOne({email:email})
           if(existinguser)
              {console.log('user exists')}
           else{
            //const hashedpassword=await bcrypt.hash(password,10)
            const data=await usermodel.create({name,email,password})
            res.status(200).json('user created')
           }
    }
    catch(e){
        console.error('error during signup',e)
    }

}

export const loginservice=async(req,res)=>{
    const {email,password}=req.body
    try{
        const findemail=await usermodel.findOne({email:email})
    if(!findemail){res.status(404).json('Wrong email')}
        //console.log(password,findemail.password)
        const passwordcheck= await bcrypt.compare(password,findemail.password)
        //console.log(passwordcheck)
        if(!passwordcheck)
            res.status(401).json('wrong pass')
        else
        { 
            const token = jwt.sign({ id:findemail._id }, JWT_SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({'message':'Login successful',token,'user_id':findemail._id})
        }
          
    }
    catch(e){
        res.status(500).json('Login server error')
    }
}
