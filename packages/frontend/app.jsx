import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import ErrorBoundary from "./src/Error/index.tsx";
import "./app.scss";

const Register = lazy(() => import("./src/Register/index.jsx"));
const Login = lazy(() => import("./src/Login/index.jsx"));
const Profile = lazy(() => import("./src/Profile/index.jsx"));
const User = lazy(() => import("./src/User/index.jsx"));

function AppLayout() {
  return (
    <div className="app">
      <Outlet />
    </div>
  );
}

const root = createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/register",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<h1>Loading....</h1>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/",
        element: (
          <Suspense fallback={<h2>Loading...</h2>}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "/user",
        element: (
          <Suspense fallback={<h2>Loading...</h2>}>
            <User />
          </Suspense>
        ),
      },
    ],
    errorElement: <ErrorBoundary />,
  },
]);

root.render(<RouterProvider router={router} />);
