import { getDb } from "../config/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({});

const adminLogin = async (req, res) => {
  try {
    const { email, password} = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Something is missing", success: false });
    }
    let admin = await getDb().collection("userlist").findOne({ email: email });
    if (!admin) {
      return res
        .status(400)
        .json({ message: "Admin not exist", success: false });
    }
    if(!admin.isAdmin){
        return res.status(400).json({message:"Not admin",success:false})
    }
    const isPasswordMatch = await bcrypt.compare(password, admin.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Password is not matching", success: false });
    }
    const payload = {
      message: "Admin login successfull",
      userId: admin.id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    admin = {
      _id: admin._id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .json({
        message: `Welcome ${admin.username}`,
        success: true,
        admin,
        token,
      });
  } catch (error) {
    return res.status(500).json({ message: "Server error", success: false });
  }
};
const adminLogout=(req,res)=>{
    try {
        res.clearCookie('token',{maxAge:0})
        return res.status(200).json({message:"Logged out successfully",success:true})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error in logging out",success:false})
    }
}
const getUserList=async(req,res)=>{
    try {
        const users = await getDb().collection('userlist').find().toArray();  
        return res.status(200).json({message:"Userdetails fetched successfull",success:true,users})
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"Error in fetching users data",success:false})
    }
  
}

const changeAdmin=async(req,res)=>{
    try {
        const {email}=req.body
        let user=await getDb().collection('userlist').findOne({email:email})
        if(user.isAdmin==false){
            await getDb().collection('userlist').updateOne({email:email},{$set:{isAdmin:true}})
        }else{
            await getDb().collection('userlist').updateOne({email:email},{$set:{isAdmin:false}})
        }
        return res.status(200).json({message:"Admin Changed",success:true})
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"Admin not Changed",success:false})
    }
}
export { adminLogin ,getUserList, adminLogout, changeAdmin};
