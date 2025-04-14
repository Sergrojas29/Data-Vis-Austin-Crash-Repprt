import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import ErrorPage from './pages/ErrorPage'
import HomePage from "./pages/HomePage";
import Interaction from './pages/Interaction';




import App from './App'
import "leaflet/dist/leaflet.css";
import './App.css'




const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Interaction />,
      },
      
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
