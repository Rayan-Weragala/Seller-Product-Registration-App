import mongoose from 'mongoose'

const userSchema =new mongoose.Schema({
    firstname:{
        type:String,
    },
    lastname:{
        type:String,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    address:{
        type:String,
    },
    mobile:{
        type:String,
    },
    bio:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
},{timeStamps:true});

const User = mongoose.model('User',userSchema);

export default User;