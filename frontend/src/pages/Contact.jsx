import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Phone, Mail, MapPin } from "lucide-react"; // Import Lucide icons
import contact2 from "../assets/contact2.avif";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setSuccess(true);
          setFormData({ name: "", email: "", message: "" });
        },
        () => {
          setSuccess(false);
        }
      )
      .finally(() => setIsSending(false));
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6">
      <div className="mt-2 mb-10 ">
        <h2 className="text-3xl font-bold text-gray-700 text-center mb-2">
          Contact Us
        </h2>
        <p className="text-gray-500 text-center max-w-2xl mx-auto">
          Have any questions or concerns? We're here to help! Reach out to us
          for inquiries, support, or collaboration opportunities. We’d love to
          hear from you and will respond as soon as possible.
        </p>
      </div>
      <div className="border border-gray-300 shadow-lg rounded-xl overflow-hidden flex w-full max-w-4xl">
        {/* Left Side - Contact Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-gray-700 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-6">
            We'd love to hear from you! Fill out the form and we'll get back to
            you soon.
          </p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-gray-700 font-semibold">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">
                Message
              </label>
              <textarea
                name="message"
                placeholder="Your message ..."
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all transform hover:scale-103 disabled:bg-gray-400"
              disabled={isSending}
            >
              {isSending ? "Sending..." : "Send Message"}
            </button>
            {success === true && (
              <p className="text-green-600 mt-3 text-center">
                Message sent successfully!
              </p>
            )}
            {success === false && (
              <p className="text-red-600 mt-3 text-center">
                Failed to send message.
              </p>
            )}
          </form>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src={contact2}
            alt="Contact Us"
            className="w-full h-full center object-cover"
          />
        </div>
      </div>

      {/* Contact Details Section */}
      <div className="mt-12 w-full max-w-2xl p-8 rounded-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Contact Information
        </h3>
        <div className="space-y-4">
          <p className="text-gray-600 flex items-center">
            <Phone className="text-blue-500 mr-2" size={18} />
            <strong className="mr-2">Phone:</strong> +91 7667750662
          </p>
          <p className="text-gray-600 flex items-center">
            <Mail className="text-blue-500 mr-2" size={18} />
            <strong className="mr-2">Email:</strong> akshaykumar880466@gmail.com
          </p>
          <p className="text-gray-600 flex items-center">
            <MapPin className="text-blue-500 mr-2" size={18} />
            <strong className="mr-2">Location:</strong> S.S College road , Devghara jehanabad , Bihar India
          </p>
          <div className="w-full h-64 bg-gray-300 rounded-md overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3431.115065071701!2d85.00497867516407!3d25.212627877701106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f2b5ede3c5bce9%3A0x3b421eaa0c3dcd28!2sS.S.%20College%2C%20Jehanabad!5e1!3m2!1sen!2sin!4v1743254874640!5m2!1sen!2sin"
              width="600"
              height="450"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
