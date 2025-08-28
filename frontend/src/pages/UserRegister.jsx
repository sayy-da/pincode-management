import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    pincode: "",
    address: "",
  });

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Watch pincode changes
  useEffect(() => {
    const fetchAddresses = async () => {
      if (/^\d{6}$/.test(form.pincode)) {
        try {
          setLoading(true);
          const res = await axios.get(
            `http://localhost:3000/pincode/${form.pincode}`
          );
          setAddresses(res.data.addresses || []);
        } catch (err) {
          console.error(err);
          setAddresses([]);
        } finally {
          setLoading(false);
        }
      } else {
        setAddresses([]);
      }
    };

    fetchAddresses();
  }, [form.pincode]);

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/register",
        form
      );
      if (response.status === 201) {
        alert("Registered Successfully");
        navigate("/login");
      }
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white p-6 rounded-2xl shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-black">Register</h2>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none text-black focus:ring-2 focus:ring-purple-500"
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none text-black focus:ring-2 focus:ring-purple-500"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none text-black focus:ring-2 focus:ring-purple-500"
        />

        {/* Pincode Input */}
        <input
          name="pincode"
          placeholder="Pincode"
          value={form.pincode}
          onChange={handleChange}
          maxLength={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none text-black focus:ring-2 focus:ring-purple-500"
        />

        {/* Dropdown for addresses */}
        {loading && <p className="text-gray-500">Fetching addresses...</p>}

        {addresses.length > 0 && (
          <select
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none text-black focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select Address</option>
            {addresses.map((addr, i) => (
              <option key={i} value={`${addr.Name}, ${addr.District}, ${addr.State}`}>
                {addr.Name}, {addr.District}, {addr.State} ({addr.BranchType})
              </option>
            ))}
          </select>
        )}

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 transition duration-300"
        >
          Register
        </button>

        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <span
            className="text-purple-600 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};
