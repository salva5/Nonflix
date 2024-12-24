import styles from "./SideBar.module.css";
import logo from "../../assets/NONFLIX-LOGO.png";
import homeIcon from "../../assets/round_home_white_24dp.png";
import profileIcon from "../../assets/round_person_outline_white_24dp.png";
import logOutIcon from "../../assets/round_logout_white_24dp.png";
import favoriteIcon from "../../assets/round_favorite_border_white_24dp.png";
import shoppingCartIcon from "../../assets/round_shopping_cart_white_24dp.png";
import adminIcon from "../../assets/admin_panel_settings_white_24dp.svg";
import { NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
   filterParameters,
   setCurrentPage,
   clearUserData,
   getGenres,
   resetCart,
} from "../../Redux/actions/actions";


function SideBar() {

   const [selectedGenre, setSelectedGenre] = useState("");
   const stateFilterParams = useSelector((state) => state.filterParameters);
   const Cart = useSelector((state) => state.Cart);
   const genres = useSelector((state) => state.genres);
   const userData = useSelector((state) => state.user);
   const dispatch = useDispatch();
   const userFirstName = userData.name.split(" ");

   useEffect(() => {
      dispatch(getGenres());
   }, []);

   const handleCategoryClick = (event) => {
      const copyFilterParameters = stateFilterParams;
      copyFilterParameters[0] = event.target.id;
      setSelectedGenre(event.target.id);
      copyFilterParameters[3] = null;
      dispatch(setCurrentPage(1));
      dispatch(filterParameters(copyFilterParameters));
   };

   const handleSideBarClicks = () => {
      setSelectedGenre("");
      dispatch(setCurrentPage(1));
   };

   const handleHomeClick = () => {
      setSelectedGenre("Home");
      const copyFilterParameters = stateFilterParams;
      copyFilterParameters[0] = "Home";
      copyFilterParameters[3] = null;
      dispatch(filterParameters(copyFilterParameters));
      dispatch(setCurrentPage(1));
   };
   const handleLogOut = () => {
      dispatch(clearUserData());
      dispatch(resetCart());
   };

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
                  className={styles.navMain}
               >  
                  <NavLink to="/Home">
                     <div className={styles.logo}>
                        <img src={logo} />
                     </div>
                  </NavLink>
                  <div className={styles.menu}>
                     <h2>Hello {userFirstName[0]}!</h2>
                     <div className={styles.views}>
                        <h3>Menu</h3>
                        <NavLink
                           to="/Home"
                           id="Home"
                           onClick={() => handleHomeClick()}
                           className={selectedGenre === "Home" ? styles.selected : styles.none}
                        >
                           <span><img src={homeIcon} />Home</span> 
                           
                        </NavLink>
                        <NavLink
                           to="/Favorites"
                           className={(navData) => (navData.isActive ? styles.selected : "none")}
                           id="favorites"
                           onClick={() => handleSideBarClicks()}
                        >
                           <span ><img src={favoriteIcon}/>Favorites</span>
                        </NavLink>
                        <NavLink
                           to="/Cart"
                           onClick={(event) => handleSideBarClicks(event)}
                           className={(navData) => (navData.isActive ? styles.selected : "none")}
                           id="cart"
                        >
                           <span> 
                              <img src={shoppingCartIcon} />
                              Cart{" "}
                              {
                                 Cart.length 
                                    ? (<div className={styles.circle}>{Cart.length}</div>)     
                                    : (<div></div>)
                              }
                           </span>
                        </NavLink>
                     </div>
                     <div className={styles.genres}>
                        <h3>Genres</h3>
                        {
                           genres
                              ? genres.map((genre, index) => (
                                    <NavLink to="/Home" key={index}>
                                       <span
                                          className={
                                          selectedGenre === genre ? styles.selected : styles.none
                                          }
                                          key={index}
                                          onClick={(event) => handleCategoryClick(event)}
                                          id={genre}
                                       >
                                          {genre}
                                       </span>
                                    </NavLink>
                                 ))
                              : "Loading..."
                        }
                     </div>
                        
                     <div className={styles.general}>
                        <h3>General</h3>
                        {
                           userData.admin && (
                              <NavLink
                                 to="/Dashboard"
                                 className={(navData) =>
                                 navData.isActive ? styles.selected : "none"
                                 }
                                 id="profile"
                              >
                                 <span><img src={adminIcon} />Admin dashboard</span>
                              </NavLink>
                           )   
                        }
                        <NavLink
                           to="/Profile"
                           className={(navData) => (navData.isActive ? styles.selected : "none")}
                           id="profile"
                           onClick={() => handleSideBarClicks()}
                        >
                           <span><img src={profileIcon} />Profile</span>
                        </NavLink>
                        <NavLink to="/" onClick={() => handleLogOut()}>
                           <span><img src={logOutIcon}/>Logout</span>
                        </NavLink>
                     </div>
                  </div>
               </Navbar.Offcanvas>
            </Container>
         </Navbar>
      </>
   );
}

export default SideBar;