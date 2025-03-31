import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        unique:true,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    phone: {
        type: String,
        required: true
    },
    dob: {
        type: String,
         default:"Not Selected"
    },
    gender: {
        type: String,
         default:"Not Selected"
    },
    image: {
        type: String
    },
    address:{
        type:String

    }
}, { timestamps: true })


const UserModel= mongoose.models.User || mongoose.model("User",userSchema)

export default UserModel;