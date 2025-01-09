import React, { useEffect, useState } from "react";
import styles from "./Card.module.css";
import "./Card.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFav, addToCart, removeFav, removeFromCart } from "../../Redux/actions/actions";
import shoppingCartIcon from "../../assets/round_shopping_cart_white_24dp.png";
import Swal from "sweetalert2";


const Card = ({ id, image, year, title, duration,lenguage, torrent}) => {
   const [isFav, setIsFav] = useState(false);
   const [addedToCart, setAddedToCart] = useState(false);

   const dispatch = useDispatch();
   const FavoriteMovies = useSelector((state) => state.FavoriteMovies)
   const user = useSelector((state) => state.user)

   const handleAddCart = () => {
      !addedToCart
         ? Swal.fire({
            position: "top-end",
            title: `"${title}" was added to your Cart 🛒`,
            icon: "success",
            showConfirmButton: false,
            backdrop: false,
            timer: 2000,
            customClass: {
               popup: "small-alert",
            },
         }) 
         : Swal.fire({
            position: "top-end",
            title:`"${title}" was removed from your Cart 🛒`,
            icon: "success",
            showConfirmButton: false,
            backdrop: false,
            timer: 2000,
            customClass: {
               popup: "small-alert",
            },
         })

      if (!addedToCart){
         setAddedToCart(true)
         dispatch(addToCart({ id, image, year, title, duration,lenguage, torrent}))
      }else {
         setAddedToCart(false)
         dispatch(removeFromCart(id))
      }
   };

   const handleFavorite = () => {
      isFav
         ? dispatch(removeFav(id, user.id))
         : dispatch(addFav(id, user.id));

      !isFav
         ? Swal.fire({
            position: "top-end",
            title: `"${title}" was added to your Favorites💖`,
            icon: "success",
            showConfirmButton: false,
            backdrop: false,
            timer: 2000,
            customClass: {
               popup: "small-alert",
            },
         }) 
         : Swal.fire({
            position: "top-end",
            title:`"${title}" was removed from your Favorites💔`,
            icon: "success",
            showConfirmButton: false,
            backdrop: false,
            timer: 2000,
            customClass: {
               popup: "small-alert",
            },
         })
      
      setIsFav(!isFav);

   };

   useEffect(() => {
      if (FavoriteMovies) {
         FavoriteMovies.forEach((fav) => {
            if (fav.id === id) {
               setIsFav(true);
            }
         })
      };
   }, [FavoriteMovies]);
   return (
      <div className={styles.flipCard}>
         <div className={styles.flipCardInner}>
            <div className={styles.cardFront}>
               <img src={image} alt={title} />
            </div>
            <div className={styles.cardBack}>
               <h2>{title}</h2>
               {
                  isFav 
                     ? ( <button className = {styles.cardBackButtonFav} onClick={handleFavorite}>💖</button>) 
                     : (<button className = {styles.cardBackButtonFav} onClick={handleFavorite}>🖤</button>)
               }
               {
                  addedToCart
                     ?  <button onClick= {handleAddCart} className={styles.cardBackButtonCart}>
                           -<img src={shoppingCartIcon} />
                        </button>
                     :  <button onClick= {handleAddCart} className={styles.cardBackButtonCart}>
                           +<img src={shoppingCartIcon} />
                        </button>
               }
               <div className= {styles.divButtons}>
                  <Link to={`/Detail/${id}`}>
                     <button className = {styles.cardBackButtonSeeMore}type="submit">View more</button>
                  </Link>
               </div>
            </div>
         </div>
      </div>

   );
};

export default Card;

