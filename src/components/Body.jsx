import React from "react";
import Layout from "./Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const Body = () => {
  const router = createBrowserRouter([{ path: "/", element: <Layout /> }]);

  return (
    <div className=" min-h-screen bg-base-200">
      <RouterProvider router={router} />
    </div>
  );
};

export default Body;
