import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";
import banner4 from "../assets/banner4.jpg";
import banner from "../assets/banner.png";

const slides = [
  {
    image: banner1,
    title: "Discover Your Next Favorite Book",
    description: "Explore a vast collection of books across different genres and start your reading journey today.",
  },
  {
    image: banner2,
    title: "Bestsellers & New Releases",
    description: "Find the latest bestsellers and new book releases to keep your library up to date.",
  },
  {
    image: banner3,
    title: "Books for Every Reader",
    description: "From fiction to self-help, find books that match your interests and goals.",
  },
  {
    image: banner4,
    title: "Exclusive Discounts & Offers",
    description: "Get the best deals and discounts on your favorite books.",
  },
  {
    image: banner,
    title: "Join Our Book Community",
    description: "Connect with fellow book lovers and share your reading journey.",
  },
];

export default function Header() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      loop={true}
      className="w-full h-auto"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="relative flex items-center justify-center w-full h-[500px] md:h-[600px] bg-cover bg-center text-center px-6 md:px-16 py-10"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url(${slide.image})`,
            }}
          >
            {/* Content Centered */}
            <div className="text-white max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight animate-fadeIn">
                {slide.title.split(" ").slice(0, 3).join(" ")}{" "}
                <span className="text-yellow-400">{slide.title.split(" ").slice(3).join(" ")}</span>
              </h1>
              <p className="mt-4 text-lg md:text-xl animate-fadeInSlow">{slide.description}</p>
              <button className="mt-6 cursor-pointer px-8 py-3 bg-yellow-500 text-black text-lg font-semibold rounded-lg shadow-md hover:bg-yellow-600 hover:shadow-lg transition-all duration-300 animate-bounce">
                Browse Books
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
