//import { useState } from 'react'
import React, { useEffect } from 'react';
import './App.css'
import  NonRegisteredHome  from "./views/NonRegisteredHome/NonRegisteredHome";
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

function App() {
  
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
        <Route exact path='/Login' element={<Login/>}/>
        <Route exact path='/Register' element={<Register/>}/>
        <Route exact path='/' element={<NonRegisteredHome/>}/>
        
                      // Private Routes
        <Route element={<ProtectedRoute canActivate={user.token}/>}>
          <Route exact path='/Home' element={<Home/>}/>
          <Route path='/Cart' element={<Cart/>}/>
          <Route path='/Detail/:id' element={<Detail />} />
          <Route path="*" element={<NotFound/>}/> 
          <Route path='/PostMovie' element={<PostMovie/>}/>  
          <Route path='/uploadImages' element={<UploadImagesTohome/>} />
          <Route path='/Favorites' element={<Favs />}/>
          <Route path='/profile' element={<Profile />} />
          <Route path='/dashboard' element={<DashBoard></DashBoard>} />
          <Route path='/users' element={<Users></Users>} />
          <Route path='/uploadMovie/:id' element={<Form></Form>} />
          <Route path='/graphics' element={<Graphics></Graphics>} />
          <Route path='/orders' element={<Orders></Orders>} />
        </Route>

      </Routes>
    </div>
  )
}

export default App
