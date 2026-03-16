import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";
import Home from './pages/home/Home.jsx';

import ERPMainPage from './pages/Erp.jsx';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import { store } from './app/store'
import { Provider } from 'react-redux'
import ProtectRoute from './ProtectRoute.js';
import App from './App.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectRoute><Home /></ProtectRoute>

  },
  {
    path: "login",
    element:
      <Login />

  },
  {
    path: "register",
    element:

      <Register />


  },
  {
    path: "erp",
    element:
      <ERPMainPage />
  },
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* <App  /> */}
    <RouterProvider router={router} />
  </Provider>,
)
