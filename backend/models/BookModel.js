
import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    old_price: {
        type: Number,
        required: true,
    },
    new_price: {
        type: Number,
        required: true
    },
    trending: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5

    },
    about: {
        type: String,
        required: true,
    }



}, { timestamps: true })

const BookModel =mongoose.models.Book || mongoose.model("Book", BookSchema)

export default BookModel;