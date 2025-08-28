import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';

export const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  const check = (status) => {
    if (status === 403) dispatch(logout());
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      check(error.response?.status);
    }
  };

  // Filter users based on search query
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-xl">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Username</th>
              <th className="py-3 px-6 text-left">Email</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.map((u) => (
              <tr key={u._id} className="hover:bg-gray-50 transition">
                <td className="py-3 px-6">{u.name}</td>
                <td className="py-3 px-6">{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Logout Button */}
      <button
        onClick={() => dispatch(logout())}
        className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
};
