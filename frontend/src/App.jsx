import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Getuser } from './components/Getuser';
import { Adduser } from './components/Adduser';
import { Toaster } from 'react-hot-toast';
import { Edit } from './components/Edit';



export const App = () => {
  const route = createBrowserRouter([
    {
      path: '/',
      element: <Getuser/>
    },
    {
      path: '/add',
      element:<Adduser/>
    },
    {
      path: '/edit/:id',
      element: <Edit/>
    }
  ]);
  

  return (
    <>
    <Toaster/>
      <RouterProvider router={route} />
    </>
  );
};
