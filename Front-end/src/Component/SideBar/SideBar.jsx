import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/NONFLIX-LOGO.png";
import style from "./SideBar.module.css";
import homeIcon from "../../assets/round_home_white_24dp.png";
import profileIcon from "../../assets/round_person_outline_white_24dp.png";
import logOutIcon from "../../assets/round_logout_white_24dp.png";
import favoriteIcon from "../../assets/round_favorite_border_white_24dp.png";
import shoppingCartIcon from "../../assets/round_shopping_cart_white_24dp.png";
import adminIcon from "../../assets/admin_panel_settings_white_24dp.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  filterParameters,
  setCurrentPage,
  clearUserData,
  getGenres,
  resetCart,
} from "../../Redux/actions/actions";
import { useEffect, useState } from "react";

const SideBar = () => {
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
    <div className={style.main}>
      <Link to="/Home">
        <div className={style.logo}>
          <img className="sidebar_image" src={logo} />
        </div>
      </Link>
      <div className={style.menu}>
        <h2>Hello {userFirstName[0]}!</h2>
        <h3>Menu</h3>
        <Link
          to="/Home"
          id="Home"
          onClick={() => handleHomeClick()}
          className={selectedGenre === "Home" ? style.selected : style.none}
        >
          <img src={homeIcon} />
          Home
        </Link>
        <NavLink
          to="/Favorites"
          className={(navData) => (navData.isActive ? style.selected : "none")}
          id="favorites"
          onClick={() => handleSideBarClicks()}
        >
          <img src={favoriteIcon} />
          Favorites
        </NavLink>
        <NavLink
          to="/Cart"
          onClick={(event) => handleSideBarClicks(event)}
          className={(navData) => (navData.isActive ? style.selected : "none")}
          id="cart"
        >
          <img src={shoppingCartIcon} />
          Cart{" "}
          {Cart.length ? (
            <div className={style.circle}>{Cart.length}</div>
          ) : (
            <div></div>
          )}
        </NavLink>

        <h3>Genre</h3>
        {genres
          ? genres.map((genre, index) => (
              <Link to="/Home" key={index}>
                <div
                  className={
                    selectedGenre === genre ? style.selected : style.none
                  }
                  key={index}
                  onClick={(event) => handleCategoryClick(event)}
                  id={genre}
                >
                  {genre}
                </div>
              </Link>
            ))
          : "Loading..."}
        <h3>General</h3>
        {userData.admin && (
          <NavLink
            to="/Dashboard"
            className={(navData) =>
              navData.isActive ? style.selected : "none"
            }
            id="profile"
          >
            <img src={adminIcon} />
            Admin dashboard
          </NavLink>
        )}
        <NavLink
          to="/Profile"
          className={(navData) => (navData.isActive ? style.selected : "none")}
          id="profile"
          onClick={() => handleSideBarClicks()}
        >
          <img src={profileIcon} />
          Profile
        </NavLink>

        <Link to="/">
          <img src={logOutIcon} />
          <div onClick={() => handleLogOut()}>Logout</div>
        </Link>
      </div>
    </div>
  );
};
export default SideBar;
