import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js'

export const test =(req,res)=>{
    res.json({
        message:"api route is working",
    })
}

export const updateUser = async (req,res,next)=>{
    if(req.user.id !==req.params.id)return next(errorHandler(401,"You can only update your own account"))
    try{
      if(req.body.password){
        req.body.password = bcryptjs.hashSync(req.body.password,10)
      }
      const updatedUser =await User.findByIdAndUpdate(req.params.id,{
        $set:{
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            username:req.body.username,
            email:req.body.email,
            address:req.body.address,
            mobile:req.body.mobile,
            bio:req.body.bio,
            password:req.password,
            avatar:req.body.avatar,
        }
      },{new:true})
      const{password,...rest}=updatedUser._doc

    res.status(200).json(rest);
}catch(error){
    next(error)
}
}

export const deleteUser = async (req,res,next)=>{
  if(req.user.id !==req.params.id)return next(errorHandler(401,"You can only delete your own account"))
  try{
    await User.findByIdAndDelete(req.params.id)
    res.clearCookie('access_token')
    res.status(200).json('User has been deleted')
}catch(error){
  next(error)
}
}