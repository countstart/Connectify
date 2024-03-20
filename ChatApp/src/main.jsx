import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Login from './components/Login.jsx';
import MainContainer from './components/MainContainer.jsx';
import Signup from './components/Signup.jsx'
import Welcome from './components/Welcome.jsx';
import Workspace from './components/Workspace.jsx';
import Allusers from './components/Allusers.jsx';
import Requestsent from './components/Requestsent.jsx';
import Requestrecieve from './components/Requestrecieve.jsx';
import MyUploads from './components/MyUploads.jsx';
import UploadNew from './components/UploadNew.jsx';
const router = createBrowserRouter([
  {
    path : '/',
    element : <App />,
    children : [
      {
        path : '/user/login',
        element: <Login />
      },
      {
        path : '/user/register',
        element : <Signup />
      },
      {
        path : '/user/chat',
        element:<MainContainer />,
        children : [
          {
            path : 'welcome',
            element : <Welcome />
          },
          {
            path : ':othername',
            element : <Workspace />
          }
        ]
      },
      {
        path : '/all-users',
        element : <Allusers />
      },
      {
        path : '/request-sent',
        element : <Requestsent />
      },
      {
        path : '/request-receive',
        element : <Requestrecieve />
      },
      {
        path : '/user/my-uploads',
        element : <MyUploads />
      },
      {
        path : '/user/new-upload',
        element : <UploadNew />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router}/>
    {/* <App /> */}
  </>,
)
