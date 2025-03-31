

import jwt from 'jsonwebtoken'

const authAdmin = async (req, res,next) => {
    try {
        const { atoken } = req.headers;

        // console.log("admin token",atoken)


        if (!atoken) {
            return res.json({ success: false, message: "Not Authorized Login Agian" })
        }
        const token_deocde = jwt.verify(atoken, process.env.JWT_SECRET)

        if (token_deocde !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: "Not Authorized Login Again " })
        }


        req.user={id:token_deocde.id};

        next();

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export default authAdmin