import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import App from './App.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import CreateEmployee from './pages/CreateEmployee.jsx'
import ShowEmployee from './pages/ShowEmployee.jsx'
import EditEmployee from './pages/EditEmployee.jsx'
import ErrorPage from './pages/ErrorPage.jsx'

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { store } from './redux/store.js'
import { Provider } from 'react-redux'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/create-employee",
        element: <CreateEmployee />,
      },
      {
        path: "/show-employee",
        element: <ShowEmployee />,
      },
      {
        path: "/edit-employee",
        element: <EditEmployee />,
      },
    ]
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce />
    </Provider>
  </React.StrictMode>,
)
