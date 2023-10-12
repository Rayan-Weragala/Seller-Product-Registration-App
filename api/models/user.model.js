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
    avatar:{
        type:String,
        default:"https://th.bing.com/th/id/OIP.GHGGLYe7gDfZUzF_tElxiQHaHa?w=190&h=190&c=7&r=0&o=5&pid=1.7"
    },
},{timeStamps:true});

const User = mongoose.model('User',userSchema);

export default User;