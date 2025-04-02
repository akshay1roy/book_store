
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import BookModel from '../models/BookModel.js';



const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const atoken = jwt.sign(email + password, process.env.JWT_SECRET)

            console.log("admin token", atoken);
            res.json({ success: true, atoken });
        }
        else {
            res.json({ success: false, message: 'Invalid Credentials' })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}




const addBook = async (req, res) => {
    try {
        const { title, category, old_price, new_price, about, rating, trending } = req.body;
        const imageFile = req.file;

        if (!title || !category || !old_price || !new_price || !about || !rating || !trending) {
            return res.json({ success: false, message: 'Missing Book data' });
        }

        // console.log(title, category, old_price, new_price, trending, rating, about)

        let imageURL = "";

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            imageURL = imageUpload.secure_url;
        }

        const bookData = {
            title, image: imageURL, category, old_price, new_price, about, rating, trending
        }

        // console.log(bookData)

        const newBook = new BookModel(bookData)

        await newBook.save();

        res.json({ success: true, message: "Book added Successfully", book: newBook })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }
}






const updateBook = async (req, res) => {
    try {
        const { title, category, old_price, new_price, about, rating, trending } = req.body;
        // const bookId = req.user?.id;
        const bookId = req.params.id;
        const imageFile = req.file;

        // console.log("req.body:", req.body);
        // console.log("req.file:", req.file);

        // console.log(title, category, old_price, new_price, about, rating, trending)


        const book = await BookModel.findById(bookId);

        if (!book) {
            return res.json({ success: false, message: "Book not found" });
        }

        let imageURL = book.image;


        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
            imageURL = imageUpload.secure_url;
        }

        // console.log("Book Id", bookId);

        // console.log(imageURL);


        const updatedBook = await BookModel.findByIdAndUpdate(
            bookId,
            {
                title: title || book.title,
                category: category || book.category,
                old_price: old_price || book.old_price,
                new_price: new_price || book.new_price,
                about: about || book.about,
                rating: rating || book.rating,
                trending: trending ?? book.trending,
                image: imageURL
            },
            { new: true } // Returns the updated document
        );
        res.json({ success: true, message: "Book updated successfully", updatedBook })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}







const deleteBook=async(req,res)=>{
    try {
        const bookId = req.params.id;

        // console.log(bookId);
        const book = await BookModel.findById(bookId);

        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }

        if (book.image) {
            const publicId = book.image.split('/').pop().split('.')[0]; // Extract public ID from URL
            await cloudinary.uploader.destroy(publicId);
        }

        await BookModel.findByIdAndDelete(bookId);

        res.json({ success: true, message: "Book deleted successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
        
    }
}


export { addBook, loginAdmin, updateBook,deleteBook }