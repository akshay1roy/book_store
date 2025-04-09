import validator from 'validator'
import bcrypt from 'bcryptjs'
import UserModel from '../models/UserModel.js';
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'



const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        if (!email || !name || !password || !phone) {
            return res.json({ success: false, message: "Missing Details" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Enter your Valid Email' })
        }


        if (password.length < 8) {
            return res.json({ success: false, message: "Enter a strong password " })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name, email, phone, password: hashedPassword
        }

        const newUser = new UserModel(userData)

        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,{expiresIn:"2d"})

        // console.log(token)


        res.json({ success: true, token })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User Doesn't exits " })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            // Generate JWT Token (expires in 7 days)
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "2d" });
            // console.log(token);

            // Remove password from the response
            // const userData = await UserModel.findById(user._id).select("-password");

            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, message: "Invalid Credentials" })
        }


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// get profile data

const getProfile = async (req, res) => {
    try {

        const userId = req.user?.id;
        // console.log('userId get userprofile',userId)

        const userData = await UserModel.findById(userId).select('-password');

        res.json({ success: true, userData });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const updateProfile = async (req, res) => {
    try {
        const { name, phone, address, dob, gender } = req.body;
        const userId = req.user?.id;
        const imageFile = req.file;

        if (!name || !phone || !dob || !gender || !address) {
            return res.json({ success: false, message: "Data Missing" });
        }

        // console.log({ userId, name, phone, address, dob, gender, imageFile });

        let imageURL = "";

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            imageURL = imageUpload.secure_url;
            // console.log("Uploaded Image URL:", imageURL);
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { name, phone, address, dob, gender, ...(imageURL && { image: imageURL }) },
            { new: true }
        );

        res.json({ success: true, message: "Profile Updated", user: updatedUser });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const getAllUuser=async(req,res)=>{
    try {

        // const userData= await UserModel.find();

        const userData = await UserModel.find().sort({ createdAt: -1 });

        res.json({ success: true, userData });

        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


export { registerUser, loginUser, getProfile, updateProfile,getAllUuser }