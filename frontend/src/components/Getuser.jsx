import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from 'axios';
import toast from 'react-hot-toast';

export const Getuser = () => {
  const [users, setUsers] = useState([]);

  // fetch users
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const resp = await axios.get('https://nodecrud1.onrender.com/api/getall');
        setUsers(resp.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);

  // delete user
  const deleteuser = async (id) => {
    try {
      const resp = await axios.delete(`https://nodecrud1.onrender.com/api/delete/${id}`);
      setUsers((prevuser) => prevuser.filter((user) => user._id !== id));
      toast.success(resp.data.message);
    } catch (error) {
      toast.error('Error deleting user');
      console.log(error);
    }
  };

  return (
    <>
      <h1 className='text-center text-4xl font-bold text-red-600 my-6'>File Upload & CRUD Application</h1>

      <div className='flex justify-center py-4'>
        <Link className='bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-sky-500 transition duration-300' to={'/add'}>
          Add User
        </Link>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 max-w-7xl mx-auto'>
        {users.map((user, i) => (
          <div key={user._id} className='bg-white rounded-2xl shadow-xl p-6 border border-gray-200 flex flex-col items-center space-y-4'>
            
            {/* Profile Image */}
            <img
              src={user.profile || "https://via.placeholder.com/120"} // replace with uploaded image URL from backend
              alt={user.name}
              className='w-28 h-28 rounded-full object-cover border-2 border-gray-300'
            />
            
            {/* User Info */}
            <div className='w-full text-center'>
              <p className='text-lg font-semibold text-gray-800'>#{i + 1}</p>
              <p className='text-base text-gray-700'><span className='font-medium'>Name:</span> {user.name}</p>
              <p className='text-base text-gray-700'><span className='font-medium'>Email:</span> {user.email}</p>
            </div>

            {/* Action Buttons */}
            <div className='flex gap-4'>
              <button
                onClick={() => deleteuser(user._id)}
                className='bg-red-600 text-white p-2 rounded hover:bg-red-500'
                title="Delete"
              >
                <MdDelete />
              </button>
              <Link
                to={`/edit/${user._id}`}
                className='bg-green-600 text-white p-2 rounded hover:bg-green-500'
                title="Edit"
              >
                <FaEdit />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
