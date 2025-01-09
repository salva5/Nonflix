import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {useEffect } from "react";
import Card from "../Card/Card";
import { cleanFavs, getFavs } from "../../Redux/actions/actions";
import styles from "./Favorites.module.css";
import Pagination from "../Pagination/Pagination";
import brokenHeart from "../../assets/brokenheart2.png";

const Favorites = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getFavs(user.id));
      return () => dispatch(cleanFavs());
   }, []);

   const user = useSelector((state) => state.user);
   const FavoriteMovies = useSelector((state) => state.FavoriteMovies);
   const currentPage = useSelector((state) => state.currentPage);
   const itemsPerPage = useSelector((state) => state.itemsPerPage);
   let moviesToDisplay;

   if (FavoriteMovies.length > 0) {
      // console.log(filteredMovies);
      moviesToDisplay = FavoriteMovies;
   } else {
      moviesToDisplay = "Add Movies to Favorite";
   }
   const paginationSize = Math.ceil(moviesToDisplay.length / 12);

   return (
      <div className={styles.home}>
         <h1>Your Favorites</h1>
         {
            FavoriteMovies.length > 0 && typeof moviesToDisplay !== "string" 
               ? (
                  <div>
                     <Pagination paginationSize={paginationSize} />
                     <div className={styles.cards}>
                        {
                           moviesToDisplay.map((props, itemIndex) => {
                              const lastIndex = itemsPerPage * currentPage - 1;
                              const firstIndex = lastIndex - 11;

                              if (itemIndex >= firstIndex && itemIndex <= lastIndex) {
                                 return (
                                    <Card
                                    key={props.id}
                                    id={props.id}
                                    title={props.title}
                                    duration={props.duration}
                                    image={props.image}
                                    year={props.year}
                                    lenguage={props.lenguage}
                                    torrent={props.torrent}
                                    />
                                 );
                              }
                           })
                        }
                     </div>
                     <Pagination paginationSize={paginationSize} />
                  </div>
               ) 
               : (
                  <div>
                     <div className={styles.emptyfavorites}>
                        <h2>This is our movies hearts</h2>
                        <img src={brokenHeart} />
                        <h2>Waiting for you to select them as your favorite</h2>
                     </div>
                  </div>
               )
         }
      </div>
   );
};

export default Favorites;
