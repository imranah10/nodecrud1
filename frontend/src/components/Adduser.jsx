import React, { useState } from 'react';
import axios from 'axios'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

export const Adduser = () => {
  const [user, setUsers] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate=useNavigate()
  const handlechange = (e) => {
    const { name, value } = e.target;
    setUsers({ ...user, [name]: value });
    // console.log(user);
  };
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
        await axios.post('https://nodecrud1.onrender.com/api/create',user)
        console.log(user)
        toast.success('User added successfully!');
        // Reset form
     setUsers({ name: '', email: '', password: '' });
      navigate('/')

    } catch (error) {
        toast.error('Internal server error')
        
    }
  }

  return (
    <>
     <div className='flex justify-center items-center mt-6'>
       <Link to={'/'} className='bg-blue-500 cursor-pointer hover:bg-blue-400 transition duration-300 px-3 py-1 rounded-md'>Back</Link>
     </div>
      <div className='max-w-3xl mx-auto bg-gray-300 border border-gray-800 p-6 rounded-lg mt-15'>
        <div className='max-w-2xl mx-auto'>
          <h1 className='text-center text-3xl text-blue-500 font-bold mb-6'>Add New User</h1>

          <form onSubmit={handleSubmit} className='w-full border border-sky-700 p-6 rounded-md bg-white shadow-md'>

            {/* Name Field */}
            <div className='mb-4'>
              <label className='block text-gray-700 font-semibold mb-2' htmlFor="name">Name</label>
              <input
                value={user.name}
                onChange={handlechange}
                className='w-full px-4 py-2 border border-gray-400 rounded-md outline-none focus:ring-2 focus:ring-blue-400'
                type="text"
                id="name"
                name="name"
                placeholder="Enter name"
              />
            </div>

            {/* Email Field */}
            <div className='mb-4'>
              <label className='block text-gray-700 font-semibold mb-2' htmlFor="email">Email</label>
              <input
                value={user.email}
                onChange={handlechange}
                className='w-full px-4 py-2 border border-gray-400 rounded-md outline-none focus:ring-2 focus:ring-blue-400'
                type="email"
                id="email"
                name="email"
                placeholder="Enter email"
              />
            </div>

            {/* Password Field */}
            <div className='mb-4'>
              <label className='block text-gray-700 font-semibold mb-2' htmlFor="password">Password</label>
              <input
                value={user.password}
                onChange={handlechange}
                className='w-full px-4 py-2 border border-gray-400 rounded-md outline-none focus:ring-2 focus:ring-blue-400'
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
              />
            </div>

            {/* Submit Button */}
            <div className='flex'>
              <input
                className='bg-blue-600 p-2 rounded-xl w-full cursor-pointer text-white hover:bg-blue-500 transition duration-300'
                type="submit"
                value="Add User"
              />
            </div>

          </form>
        </div>
      </div>
    </>
  );
};
