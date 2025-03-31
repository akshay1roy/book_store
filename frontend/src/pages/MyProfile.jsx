import React, { useState } from "react";
import upload_area from "../assets/upload_area.png"; // Import correctly

export default function MyProfile() {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    address: "123 Main St, City, Country",
    image: "",
    dob: "",
    gender: "Not Selected",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setUserData((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  return (
    <div className="p-6 mt-16 mb-10 m-auto max-w-lg mx-auto bg-white shadow-md rounded-md">
      {/* Profile Image Upload */}
      <div className="flex flex-col items-center">
        {isEdit ? (
          <label htmlFor="image" className="cursor-pointer">
            <div className="relative">
              <img
                className="w-16 h-16 md:w-28 md:h-28 rounded-full border border-gray-300"
                src={
                  image
                    ? URL.createObjectURL(image)
                    : userData.image || upload_area
                }
                alt="Profile"
              />
            </div>
            <input type="file" id="image" hidden onChange={handleImageChange} />
          </label>
        ) : (
          <img
            className="w-36 h-36 rounded-full border border-gray-300"
            src={userData.image || upload_area}
            alt="Profile"
          />
        )}
      </div>

      {/* User Name */}
      <div className="text-center mt-4">
        {isEdit ? (
          <input
            className="bg-gray-100 text-2xl font-medium max-w-60 p-2 text-center rounded-md"
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p className="font-medium text-2xl text-neutral-800">
            {userData.name}
          </p>
        )}
      </div>

      <hr className="my-4 border-gray-300" />

      {/* Contact Information */}
      <div>
        <p className="text-neutral-500 underline font-semibold">
          CONTACT INFORMATION
        </p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email:</p>
          <p className="text-blue-500">{userData.email}</p>

          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              type="text"
              value={userData.phone}
              className="bg-gray-100 p-1 border rounded-md"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-400">{userData.phone}</p>
          )}

          <p className="font-medium">DOB:</p>
          {isEdit ? (
            <input
              type="date"
              value={userData.dob}
              className="bg-gray-100 p-1 border rounded-md max-w-40"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-400">{userData.dob || "Not Set"}</p>
          )}

          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="max-w-20 bg-gray-50"
              value={userData.gender || ""}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
            >
              <option value="">Select one</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p className="text-gray-400">{userData.gender}</p>
          )}

          <p className="font-medium">Address:</p>
          {isEdit ? (
            <input
              type="text"
              className="bg-gray-100 p-1 border rounded-md w-full"
              value={userData.address}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, address: e.target.value }))
              }
            />
          ) : (
            <p className="text-gray-500">{userData.address}</p>
          )}
        </div>
      </div>

      {/* Edit/Save Button */}
      <div className="text-center mt-6">
        <button
          className={`w-38 text-white cursor-pointer px-4 py-2 rounded-md transition-all ${
            isEdit
              ? "bg-green-500 hover:bg-green-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={() => setIsEdit(!isEdit)}
        >
          {isEdit ? "Save" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
}
