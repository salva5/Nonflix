import { NavLink } from "react-router-dom";
import logo from "../../assets/NONFLIX-LOGO.png";
import styles from "./AdminSideBar.module.css";
import homeIcon from "../../assets/round_home_white_24dp.png";
import profileIcon from "../../assets/round_person_outline_white_24dp.png";
import logOutIcon from "../../assets/round_logout_white_24dp.png";
import ordersIcon from "../../assets/receipt_long_white_24dp.svg";
import graphicsIcon from "../../assets/insights_white_24dp.svg";
import { useDispatch } from "react-redux";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {
   clearUserData,
   getGenres,
} from "../../Redux/actions/actions";
import { useEffect } from "react";
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
      <>
         <Navbar expand="false" className=" position-absolute navbar-dark">
            <Container >
               <div className="d-flex align-items-center">
                  <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} className={styles.toggle}/>  
                  <NavLink to="/Home">
                     <div className={styles.logo}>
                        <img src={logo} />
                     </div>
                  </NavLink>
               </div>
               <Navbar.Offcanvas 
                  id={`offcanvasNavbar-expand-${false}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
                  placement="start"
                  className={styles.ofCanvas}
               >  
                  <NavLink to="/Home">
                     <div className={styles.logo}>
                        <img src={logo} />
                     </div>
                  </NavLink>
                  <div className={styles.menu}>
                     <h3>Menu</h3>
                     <NavLink to="/Dashboard">
                        <span><img src={movieIcon}/>Movies</span>
                     </NavLink>
                     <NavLink to="/users" id="Users">
                        <span><img src={usersIcon}/>Users</span>
                     </NavLink>
                     <NavLink to="/orders">
                        <span><img src={ordersIcon}/>Orders</span>
                     </NavLink>
                     <NavLink to="/graphics">
                        <span><img src={graphicsIcon} />Graphics</span>
                     </NavLink>
                     <NavLink to="/Home">
                        <span><img src={homeIcon} />Nonflix HOME</span>
                     </NavLink>
                  </div>
                  <div className={styles.general}>
                     <h3>General</h3>
                     <NavLink to="/Profile">
                        <span><img src={profileIcon} />Profile</span>
                     </NavLink>
                     <NavLink 
                        to="/"
                        onClick={() => handleLogOut()}
                     >
                        <span><img src={logOutIcon} />Logout</span>
                     </NavLink>
                  </div>
               </Navbar.Offcanvas>
            </Container>
         </Navbar>
         
      </>
   );
};
export default AdminSideBar;

