import React from "react";
import aks from "../assets/aks.jpg";
import { Linkedin, Github, Instagram } from "lucide-react";

export default function About() {
  const data = [
    {
      name: "Akshay kumar",
      profession: "Software Engineer",
      about:
        "John is a passionate software engineer with 5 years of experience in developing scalable web applications. He loves working with modern technologies and solving complex problems.",
      img: aks,
      linkdin: "https://www.linkedin.com/in/akshaykumar7667/",
      github: "https://github.com/johndoe",
      instagram: "https://instagram.com/johndoe",
      

    },
    {
      name: "Ayushman Giri",
      profession: "Digital Marketer",
      about:
        "Emma is an expert in digital marketing, specializing in SEO, content strategy, and social media marketing. She has helped numerous brands grow their online presence.",
      img: aks,
      linkdin: "https://www.linkedin.com/in/akshaykumar7667/",
      github: "https://github.com/johndoe",
      instagram: "https://instagram.com/johndoe",
    },
    {
      name: "Shubham Kumar",
      profession: "UI/UX Designer",
      about:
        "Michael is a creative UI/UX designer with a keen eye for detail. He focuses on designing user-friendly interfaces that enhance user experience and engagement.",
      img: aks,
      linkdin: "https://www.linkedin.com/in/akshaykumar7667/",
      github: "https://github.com/johndoe",
      instagram: "https://instagram.com/johndoe",
    },
  ];

  return (
    <div className="mx-auto p-4 md:p-16 mt-6 max-w-7xl">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
        About Us
      </h1>

      {/* Introduction */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3 border-l-4 border-blue-500 pl-3">
          Who We Are
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Welcome to our platform! We are dedicated to providing top-notch
          services for our customers. Our team of professionals works
          passionately to deliver high-quality products and ensure complete
          customer satisfaction.
        </p>
      </section>

      {/* Mission Statement */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3 border-l-4 border-green-500 pl-3">
          Our Mission
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Our mission is to create an innovative and user-friendly experience,
          making our services accessible to everyone. We continuously evolve and
          adapt to the changing needs of our customers, ensuring we stay ahead
          in the industry.
        </p>
      </section>

      {/* Vision Statement */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3 border-l-4 border-yellow-500 pl-3">
          Our Vision
        </h2>
        <p className="text-gray-700 leading-relaxed">
          We envision a world where technology bridges gaps and enhances lives.
          Our goal is to be a leader in our industry by offering cutting-edge
          solutions that make a real difference in people's lives.
        </p>
      </section>

      {/* Why Choose Us */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3 border-l-4 border-red-500 pl-3">
          Why Choose Us?
        </h2>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
          <li className="hover:text-blue-500 transition">
            High-quality and reliable services
          </li>
          <li className="hover:text-blue-500 transition">
            Customer-focused approach
          </li>
          <li className="hover:text-blue-500 transition">
            Innovative and adaptive solutions
          </li>
          <li className="hover:text-blue-500 transition">
            Experienced and passionate team
          </li>
          <li className="hover:text-blue-500 transition">
            Commitment to excellence and integrity
          </li>
        </ul>
      </section>

      {/* Team Members */}
      <h2 className="text-center text-3xl mb-8 text-gray-700 font-semibold ">
        Our Team Leader{" "}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {data.map((item, index) => (
          <div
            key={index}
            className=" border-gray-500 p-6 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-102 hover:shadow-xl"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-88 object-cover rounded-lg"
            />

            <div className="mt-4 text-center">
              <h2 className="text-xl font-bold text-pink-600">{item.name}</h2>
              <p className="text-green-500 font-medium  ">{item.profession}</p>
              <p className="text-gray-600 mt-2">{item.about}</p>

              <div className="flex justify-center space-x-4 mt-4">
                <a
                  href={item.linkdin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href={item.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-black transition"
                >
                  <Github size={24} />
                </a>
                <a
                  href={item.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:text-pink-700 transition"
                >
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
