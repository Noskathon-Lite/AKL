import React, { useState } from "react";
import axios from "axios";

const PostProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    image: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

//   const handleFileChange = (e) => {
//     setFormData({
//       ...formData,
//       image: e.target.files[0],
//     });
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, category, price, image } = formData;

    if (!title || !category || !price || !image) {
      setMessage("All fields are required!");
      return;
    }

    // const formDataToSend = new FormData();
    // formDataToSend.append("title", title);
    // formDataToSend.append("category", category);
    // formDataToSend.append("price", price);
    // formDataToSend.append("image", image);

    const accessToken = localStorage.getItem("accessToken"); 

    try {
      const response = await axios.post(
        "http://localhost:3500/products",formData,
        {
            headers: {
              Authorization: `Bearer ${accessToken}`,  // Include the token in the Authorization header
            },
          }
      );

      if (response.status === 201) {
        setMessage("Product posted successfully!");
        setFormData({
          title: "",
          category: "",
          price: "",
          image: "",
        });
      }
    } catch (error) {
      console.error("Error posting product:", error);
      setMessage("Failed to post product. Please try again.");
    }
  };

  return (
    <div className="pt-[100]px flex items-center justify-center min-h-screen bg-green-50">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Post Your Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Product Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Product Image
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
          >
            Post Product
          </button>
          {message && <p className="text-center text-red-500 mt-4">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default PostProduct;
