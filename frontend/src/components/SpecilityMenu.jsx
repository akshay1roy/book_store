import { Link } from "react-router-dom";
import { categorires } from "../assets/assets";
// import { useContext } from "react";
// import { UserAppContext } from "../context/UserAppContext";
// import { useEffect } from "react";

export default function SpecilityMenu() {
  

  return (
    <div
      id="category"
      className="flex flex-col items-center gap-4 py-16 text-gray-800"
    >
      <h1 className="text-3xl font-medium">Find by Category</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>
      <div className="flex sm:justify-center   items-center gap-4 pt-5 w-full overflow-scroll">
        {categorires.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 p-3 rounded-lg transition-all duration-300 ease-in-out hover:bg-blue-200/50 hover:-translate-y-2"
            key={index}
            to={`/books/${item.category}`}
          >
            <img
              className="w-16 sm:w-24 mb-2"
              src={item.image}
              alt={item.category}
            />
            <p className="font-medium">{item.category}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
