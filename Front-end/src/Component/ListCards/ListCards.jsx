import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Card from "../Card/Card";
import { getMovies } from "../../Redux/actions/actions";
import styles from "./ListCards.module.css";
import Pagination from "../Pagination/Pagination";
import Swal from "sweetalert2";

const ListCards = ({ id }) => {
   const dispatch = useDispatch();
   const movies = useSelector((state) => state.Allmovies);
   const currentPage = useSelector((state) => state.currentPage);
   const itemsPerPage = useSelector((state) => state.itemsPerPage);
   const filteredMovies = useSelector((state) => state.filteredMovies);
   useEffect(() => {
      dispatch(getMovies());
   }, []);

   let moviesToDisplay;
   if (
      filteredMovies === "No movies found" ||
      filteredMovies === "Name is required"
   ) {
      Swal.fire({
         position: "top",
         showConfirmButton: false,
         timer: 1000,
         text: filteredMovies,
      });
      moviesToDisplay = movies;
   } else {
      moviesToDisplay = filteredMovies.length > 0 ? filteredMovies : movies;
   }

   const paginationSize = Math.ceil(moviesToDisplay.length / 12);

   let moviesToShow = moviesToDisplay.filter((movie) => movie.disabled === false)
   if(moviesToDisplay.length > 0 && moviesToShow.length === 0){
      Swal.fire({
         position: "top",
         showConfirmButton: false,
         backdrop: false,
         timer: 1000,
         text: "No movies found",
      });
      moviesToDisplay = movies;
      moviesToShow = moviesToDisplay.filter((movie) => movie.disabled === false);
   }

   if (moviesToShow.length > 0) {
      return (
         <div className={styles.main}>
            <Pagination paginationSize={paginationSize} />
            <div className={styles.cards}>
               {
                  moviesToShow.map((props, itemIndex) => {
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
                        )
                     }
                  })
               }
            </div>
            <Pagination paginationSize={paginationSize} />
         </div>
      );
   } else {
      return (
         <div>
            <h2>Loading...</h2>
         </div>
      );
   }
};

export default ListCards;
