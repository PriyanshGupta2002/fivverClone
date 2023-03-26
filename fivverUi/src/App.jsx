import React  from 'react'

import Navbar from './components/navbar/Navbar'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom'
import './app.scss'
import Footer from './components/footer/Footer'
import {Home,Add,Gig,Gigs,Message,Messages,MyGigs,Orders, Login, Register,Pay} from '../src/pages/index'


const App = () => {

  const Layout=()=>{
    return(
      <>
      <Navbar/>
      <Outlet/>
      <Footer/>
      </>
    )
  } 
 
  const router = createBrowserRouter([
    {
      path:'/',
      element: <Layout/>,
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/gigs",
          element:<Gigs/>
        },
        {
          path:"/gig/:id",
          element:<Gig/>
        },
        {
          path:"/add",
          element:<Add/>
        },
        {
          path:"/message/:id",
          element:<Message/>
        },
        {
          path:"/messages",
          element:<Messages/>
        },
        {
          path:"/orders",
          element:<Orders/>
        },
        {
          path:"/my-gigs",
          element:<MyGigs/>
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/register",
          element:<Register/>
        },
        {
          path:"/pay",
          element:<Pay/>
        }
      ]
    }
  ])


  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App