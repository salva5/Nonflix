//import { useState } from 'react'
import React, { useEffect } from 'react';
import './App.css'
import  NonRegisteredHome  from "./views/NonRegisteredHome";
import Register from './Component/Register/Register';
import {Routes, Route, useNavigate} from "react-router-dom"
import Login from './Component/Login/Login';
import Home from './Component/Home/Home';
import Detail from './Component/Detail/Detail';
import NotFound from "./Component/NotFound/NotFound";
import Cart from './Component/Cart/Cart';
import PostMovie from "./Component/PostMovie/PostMovie"
import Favs from './Component/Favorite/Favs';
import Profile from './Component/Profile/Profile';
import UploadImagesTohome from './Component/UploadImages/uploadImagesTohome';
import ProtectedRoute from './Component/utils/ProtectedRoute';
import { useSelector } from 'react-redux';
import DashBoard from "./Component/DashBoard/DashBoard";
import Users from "./Component/Users/Users";
import Form from './Component/FormPutMovie/FormPutMovie';
import Graphics from './Component/Graphics/Graphics';
import Orders from './Component/Orders/Orders';
import LayoutSideBar from './Component/utils/LayoutSideBar';

function App() {
  const privateRoutes = [
    { path: '/Home', element: <Home /> },
    { path: '/Cart', element: <Cart /> },
    { path: '/Detail/:id', element: <Detail /> },
    { path: '/PostMovie', element: <PostMovie /> },
    { path: '/uploadImages', element: <UploadImagesTohome /> },
    { path: '/Favorites', element: <Favs /> },
    { path: '/profile', element: <Profile /> },
    { path: '/dashboard', element: <DashBoard /> },
    { path: '/users', element: <Users /> },
    { path: '/uploadMovie/:id', element: <Form /> },
    { path: '/graphics', element: <Graphics /> },
    { path: '/orders', element: <Orders /> },
  ];
  
  const user = useSelector((state) => state.user);
  // Redirect to home
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user.token) {
      if(!user.admin){
        return navigate('/Home');

      }
    }
  }, [user.token]);

  return (
    <div>
      <Routes>
        {/*Publics Routes*/}
        <Route exact path='/Login' element={<Login/>}/>
        <Route exact path='/Register' element={<Register/>}/>
        <Route exact path='/' element={<NonRegisteredHome/>}/>
        
        {/* Private Routes */}
        <Route element={<ProtectedRoute canActivate={user.token}/>}>
          {
            privateRoutes.map(({path, element}) => {
              return <Route path={path} element={<LayoutSideBar>{element}</LayoutSideBar>}/>
            })
          }
          <Route path="*" element={<NotFound />} />
        </Route>

      </Routes>
    </div>
  )
}

export default App
