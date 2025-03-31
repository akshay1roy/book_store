// import Book from "../models/BookModel";

import BookModel from "../models/BookModel.js";



const getBooks=async(req,res)=>{
    try {
        const books= await BookModel.find();
        res.json({success:true, books})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


const getBookById=async(req,res)=>{
    try {
        const book=await BookModel.findById(req.params.id);
        if(!book)
        {
            return res.json({success:false, message:"Book not found"})
        }

        res.json({success:true, message:book})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {getBooks,getBookById}
