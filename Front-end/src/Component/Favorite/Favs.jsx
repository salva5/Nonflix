
import { useEffect } from "react";
import Filters from "../Filters/Filters";
import ListCards from "../ListCards/ListCards";
import SearchBar from "../SearchBar/SearchBar";
import SideBar from "../SideBar/SideBar";
import Favorites from "./Favorites";
import style from "./Favorites.module.css";
import { useDispatch } from "react-redux";
import { cleanFavs } from "../../Redux/actions/actions";
import BackButton from "../BackButton/BackButton";

const Favs = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    return ()=> {dispatch(cleanFavs())}
  }, []);
  return (
    <div className={style.home}>
        <SideBar />
      <div className={style.favorites}>
        <BackButton/>
        <Favorites />
      </div>
    </div>
  );
};

export default Favs;