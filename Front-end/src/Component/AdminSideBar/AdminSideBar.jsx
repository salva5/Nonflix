import { Link } from "react-router-dom";
import logo from "../../assets/NONFLIX-LOGO.png";
import style from "./AdminSideBar.module.css";
import homeIcon from "../../assets/round_home_white_24dp.png";
import profileIcon from "../../assets/round_person_outline_white_24dp.png";
import logOutIcon from "../../assets/round_logout_white_24dp.png";
import ordersIcon from "../../assets/receipt_long_white_24dp.svg";
import graphicsIcon from "../../assets/insights_white_24dp.svg";
import shoppingCartIcon from "../../assets/round_shopping_cart_white_24dp.png";
import { useDispatch, useSelector } from "react-redux";
import {
  clearUserData,
  getGenres,
} from "../../Redux/actions/actions";
import { useEffect, useState } from "react";
import movieIcon from "../../assets/movie_white_24dp.svg";
import usersIcon from "../../assets/group_white_24dp.svg";

const AdminSideBar = () => {
    
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(clearUserData());
  };

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  return (
    <div className={style.main}>
      <Link to="/Home">
        <div className={style.logo}>
          <img className="sidebar_image" src={logo} />
        </div>
      </Link>
      <div className={style.menu}>
        <h3>Menu</h3>
        <Link to="/Dashboard">
          <img src={movieIcon} />
          <div>Movies</div>
        </Link>
        <Link to="/users" id="Users">
          <img src={usersIcon} />
          <div className={style.users}>Users</div>
        </Link>
        
        <Link to="/orders">
          <img src={ordersIcon} />
          <div>Orders</div>
        </Link>
        <Link to="/graphics">
          <img src={graphicsIcon} />
          <div>Graphics</div>
        </Link>
        <Link to="/Home">
          <img src={homeIcon} />
          <div>Nonflix HOME</div>
        </Link>

        <h3>General</h3>
        <Link to="/Profile">
          <img src={profileIcon} />
          <div>Profile</div>
        </Link>
        <Link to="/">
          <img src={logOutIcon} />
          <div onClick={() => handleLogOut()}>Logout</div>
        </Link>
      </div>
    </div>
  );
};
export default AdminSideBar;
