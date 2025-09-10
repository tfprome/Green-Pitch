import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY;

export const authmiddleware=(req,res,next)=>{
    try{
        const token=req.headers.authorization?.split(" ")[1]
    if(!token)
        res.status(402).json('No token in auth')
    if(token){
        const decoded=jwt.verify(token,JWT_SECRET_KEY)
        req.UserID=decoded.id
        //console.log('userid sent from auth')
        next()
    }
    }
    catch(e){
        console.error('error during auth:',e)
    }

}