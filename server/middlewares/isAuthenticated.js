
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({})

const isAuthenticated =(req,res,next)=>{
    try {
        const token=req.cookies.token
        if(!token){
            return res.status(400).json({message:"User not authenticated",success:false})
        }
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        if(!decode){
            res.status(400).json({message:"Invalid Token",success:false})
        }
        req.id=decode.userId
        next()
    } catch (error) {
        console.log(error);
        return res.status(401).json({message:"Error in user authentication",success:false})
    }
}

export default isAuthenticated;