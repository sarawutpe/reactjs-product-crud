import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Edit from './Edit.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <p>404 Not Found!</p>,
    children: [
      {
        path: '',
        element: <App />,
      },
      {
        path: 'edit/:id',
        element: <Edit />,
      },
    ],
  },
  {
    path: '*',
    element: <App />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
