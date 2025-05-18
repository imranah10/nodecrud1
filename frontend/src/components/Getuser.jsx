import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from 'axios';
import toast from 'react-hot-toast';

export const Getuser = () => {
    const [users, setUsers] = useState([]);
    // fetching data 
    useEffect(()=>{
        const fetchdata=async()=>{
            try {
                const resp=await axios.get('http://localhost:8080/api/getall')
                setUsers(resp.data.data)
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchdata();
    },[])
    // delete user
    const deleteuser = async (id) =>{
       try {
                const resp=await axios.delete(`http://localhost:8080/api/delete/${id}`)
                setUsers((prevuser)=>prevuser.filter((user)=>user._id!==id))
              toast.success(resp.data.message)
            } catch (error) {
                toast.error(resp.data.message)
                console.log(error);
                
            }
    }
  return (
    <>
      <h1 className='text-center text-4xl font-bold text-red-600 my-6'>node Crud Operation</h1>
      <div className='max-w-6xl border border-[#04142c] mx-auto shadow-2xl rounded-2xl py-3'>
        <div className='flex justify-center items-center py-4'>
          <Link className='bg-blue-700 text-white px-2 py-1 rounded-lg shadow-2xl hover:bg-sky-500 transition duration-300' to={'/add'}>
            Add User
          </Link>
        </div>
        <div className='bg-gray-700 shadow-2xl rounded-2xl max-w-5xl mx-auto'>
          <table className='w-full text-center'>
            <thead className='border-b border-gray-400 text-[#fff]'>
              <tr>
                <th>Sr.No</th>
                <th>UserName</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
           <tbody className='bg-sky-600 text-[#ffffffe1] space-y-3'>
    {users.map((user,i)=>{
        return(
              <tr key={user._id}>
    <td className='border-b border-gray-300 px-4 py-2'>{i+1}</td>
    <td className='border-b border-gray-300 px-4 py-2'>{user.name}</td>
    <td className='border-b border-gray-300 px-4 py-2'>{user.email}</td>
    <td className='border-b border-gray-300 px-4 py-2'>
      <div className='flex justify-center items-center gap-x-3'>
        <button onClick={()=>deleteuser(user._id)} className='bg-red-600 rounded px-3 py-2 cursor-pointer hover:bg-red-500'><MdDelete /></button>
        <Link to={`/edit/`+user._id} className='bg-green-500 rounded px-3 py-2 cursor-pointer hover:bg-green-400'><FaEdit /></Link>
      </div>
    </td>
  </tr>
        )
    })}
</tbody>

          </table>
        </div>
      </div>
    </>
  );
};
