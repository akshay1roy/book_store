
import jwt from 'jsonwebtoken'

const authUser=async(req,res,next)=>{
    try {
        const {token}= req.headers;

        if(!token){
            return res.json({success:false, message:"Not Authorized Login Agian"})
        }

        const token_decode=jwt.verify(token,process.env.JWT_SECRET)

        console.log("user decode token",token_decode)

        if (!token_decode || !token_decode.id) {
            return res.status(401).json({ success: false, message: "Invalid Token" });
        }

        req.user= {id:token_decode.id}
        console.log(req.user)

        next();

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export default authUser