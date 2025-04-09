

import jwt from 'jsonwebtoken'

const authAdmin = async (req, res,next) => {
    try {
        const { atoken } = req.headers;

        // console.log("admin token",atoken)


        if (!atoken) {
            return res.json({ success: false, message: "Not Authorized Login Agian" })
        }
        const token_deocde = jwt.verify(atoken, process.env.JWT_SECRET)

        // console.log(token_deocde)

        if (token_deocde.email !== process.env.ADMIN_EMAIL) {
            return res.json({ success: false, message: "Not Authorized Login Again " })
        }


        // req.user={id:token_deocde.id};
        req.user = { email: token_deocde.email };
        // console.log("req user",req.user)

        next();

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export default authAdmin