


import book_1 from './books/book-1.png'
import book_2 from './books/book-2.png'
import book_3 from './books/book-3.png'
import book_4 from './books/book-4.png'
import book_5 from './books/book-5.png'
import book_6 from './books/book-6.png'
import book_7 from './books/book-7.png'
import book_8 from './books/book-8.png'
import book_9 from './books/book-9.png'
import book_10 from './books/book-10.png'
// import book_1 from './books/book-1.png'
// import book_1 from './books/book-1.png'


















// import banner from './banner.png'
import bio from './bio.png'
import fantancy from './fantancy.jpeg'
import finance from './finance.jpg'
import histroy from './history.png'
import science from './science.png'




export const categorires = [
    // History

    {
        category: "History",
        image: histroy
    },

    // Finance
    {
        category: "Finance",
        image: finance
    },


    // Science Fiction
    {
        category: "Science Fiction",
        image: science
    },


    // Fantasy
    {
        category: "Fantasy",
        image: fantancy
    },



    // Biography
    {
        category: "Biography",
        image: bio
    }


]






export const books = [
    // Thriller
    {
        _id: 1,
        title: "The Silent Patient",
        category: "Thriller",
        image: book_1,
        old_price: 20.99,
        new_price: 15.99,
        trending: true,
        rating: 4.8,
        about: "A psychological thriller about a woman who stops speaking after a violent crime."
    },
    {
        _id: 2,
        title: "Gone Girl",
        category: "Thriller",
        image: book_2,
        old_price: 22.50,
        new_price: 16.50,
        trending: false,
        rating: 4.7,
        about: "A mystery novel about a woman's disappearance and secrets in marriage."
    },
    {
        _id: 3,
        title: "The Girl on the Train",
        category: "Thriller",
        image: book_3,
        old_price: 19.99,
        new_price: 14.99,
        trending: true,
        rating: 4.6,
        about: "A gripping mystery about a woman entangled in a crime."
    },
    {
        _id: 4,
        title: "Shutter Island",
        category: "Thriller",
        image: book_4,
        old_price: 21.00,
        new_price: 17.00,
        trending: false,
        rating: 4.5,
        about: "A detective investigates a missing patient on a mysterious island."
    },
    {
        _id: 5,
        title: "Before I Go to Sleep",
        category: "Thriller",
        image: book_5,
        old_price: 23.99,
        new_price: 18.99,
        trending: true,
        rating: 4.4,
        about: "A woman loses her memory every night and tries to uncover the truth."
    },

    // Self-Help
    {
        _id: 6,
        title: "Atomic Habits",
        category: "Self-Help",
        image: book_6,
        old_price: 18.99,
        new_price: 14.99,
        trending: true,
        rating: 4.9,
        about: "A guide to building good habits and mastering behaviors for success."
    },
    {
        _id: 7,
        title: "The Subtle Art of Not Giving a F*ck",
        category: "Self-Help",
        image: book_7,
        old_price: 23.00,
        new_price: 17.50,
        trending: false,
        rating: 4.5,
        about: "A counterintuitive approach to living a good life."
    },
    {
        _id: 8,
        title: "The Power of Now",
        category: "Self-Help",
        image: book_8,
        old_price: 24.00,
        new_price: 18.00,
        trending: true,
        rating: 4.8,
        about: "A guide to spiritual enlightenment and living in the present moment."
    },
    {
        _id: 9,
        title: "Think and Grow Rich",
        category: "Self-Help",
        image: book_9,
        old_price: 18.50,
        new_price: 13.50,
        trending: true,
        rating: 4.7,
        about: "A personal development book on success and wealth."
    },
    {
        _id: 10,
        title: "The 5 AM Club",
        category: "Self-Help",
        image: book_10,
        old_price: 19.99,
        new_price: 15.99,
        trending: false,
        rating: 4.6,
        about: "A book on maximizing morning routines to boost productivity."
    },

    // Fiction
    {
        _id: 11,
        title: "The Midnight Library",
        category: "Fiction",
        image: book_1,
        old_price: 22.50,
        new_price: 16.50,
        trending: false,
        rating: 4.7,
        about: "A novel about all the lives one could have lived, exploring choices and regrets."
    },
    {
        _id: 12,
        title: "Where the Crawdads Sing",
        category: "Fiction",
        image: book_2,
        old_price: 24.99,
        new_price: 19.99,
        trending: true,
        rating: 4.8,
        about: "A coming-of-age mystery set in the marshlands."
    },
    {
        _id: 13,
        title: "The Great Gatsby",
        category: "Fiction",
        image: book_6,
        old_price: 15.99,
        new_price: 10.99,
        trending: false,
        rating: 4.6,
        about: "A classic novel about the American Dream and lost love."
    },
    {
        _id: 14,
        title: "Pride and Prejudice",
        category: "Fiction",
        image: book_4,
        old_price: 17.99,
        new_price: 12.99,
        trending: false,
        rating: 4.9,
        about: "A romance novel exploring love and society."
    },
    {
        _id: 15,
        title: "To Kill a Mockingbird",
        category: "Fiction",
        image: book_1,
        old_price: 16.99,
        new_price: 12.49,
        trending: false,
        rating: 4.9,
        about: "A novel about racial injustice and childhood in the Deep South."
    }
]
