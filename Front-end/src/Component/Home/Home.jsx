import Filters from "../Filters/Filters";
import ListCards from "../ListCards/ListCards";
import SearchBar from "../SearchBar/SearchBar";
import SideBar from "../SideBar/SideBar";
import style from "./Home.module.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetCart } from "../../Redux/actions/actions";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [notification, setNotification] = useState({
    message: "",
    isOpen: false
  })

  const dispatch = useDispatch()
  

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const status = urlParams.get("status")
    if(status === "approved") {
      setNotification({
        message : toast.success("Purchase completed"),
        isOpen: true
      })
      dispatch(resetCart())
    } else if (status === "failure" || status === "null") {
      setNotification({
        message : toast.error("There was an error in your purchase"),
        isOpen: true
      })
    }
    
    setTimeout(() => {
      setNotification({
        message: "",
        isOpen: false
      })
      
    }, 3000)
    if (window.location.search.includes("status=approved")) {
      var currentURL = new URL(window.location.href);

      var newURL = new URL(currentURL);
      newURL.searchParams.delete("status");
      history.replaceState(null,"", newURL);
    }
  },[])
  
  return (
    <div className={style.home}>
      <SideBar/>
      {notification.isOpen && toast.success(notification.message) && <ToastContainer limit={1} autoClose={3000} position= "bottom-right"/>}
      
      <div className={style.center}>
        <div className={style.header}>
          <Filters />
          <SearchBar />
        </div>
        <ListCards />
      </div>
    </div>
  );
};

export default Home;
