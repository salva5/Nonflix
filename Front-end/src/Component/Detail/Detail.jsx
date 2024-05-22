import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import style from "./Detail.module.css";
import { cleanDetail, getDetailMovie, getPurchasedMovies } from "../../Redux/actions/actions";
import { addToCart } from "../../Redux/actions/actions";
import axios from "axios";
import Swal from "sweetalert2";
import BackButton from "../BackButton/BackButton";

const Detail = () => {
  const [movie, setMovie] = useState({});
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const userId = user.id;
  const movieId = id;
  const selectedMovie = useSelector((state) => state.movieDetail);
  const shoppingHistory = useSelector((state) => state.shoppingHistory);
  console.log(shoppingHistory);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPurchasedMovies(user.id));
    
  }, []);

  const [reviews, setReviews] = useState([]);

  const [newReview, setNewReview] = useState({
    title: "",
    description: "",
    rating: 0
  });

  const [addedToCart, setAddedToCart] = useState(false);
  const handleAddCart = () => {
    setAddedToCart(true);
    dispatch(addToCart(selectedMovie))
    //agregar a carrito de compras
  };

  const favoriteHandler = () => {
    //agregar a Db
  };

  const handleChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  const addReview = async () => {
    if (Object.values(newReview).some((value) => value === "" || value === 0)) {
      return Swal.fire({
        icon: "warning",
        title: "You haven't completed all fields",
        text: "Please complete all 3 fields of the review"
      })
    }
    try {
      const { data } = await axios.post("/Nonflix/movies/review", { ...newReview, movieId, userId })

      setReviews([...reviews, { title: data.title, description: data.description, rating: data.rating }])

      setNewReview(
        {
          title: "",
          description: "",
          rating: 0
        })

      Swal.fire({
        icon: "success",
        title: "Thanks for your review",
        showConfirmButton: false,
        backdrop: false,
        timer: 1500
      });

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message
      });
    }
  };

  useEffect(() => {

    dispatch(getDetailMovie(id));
    return () => {
      dispatch(cleanDetail())
    }
  }, [id]);

  useEffect(() => {
    if (selectedMovie?.Reviews !== undefined && selectedMovie.Reviews.length > 0) {
      setReviews([...reviews, ...selectedMovie?.Reviews])
    }
  }, [selectedMovie?.Reviews])

  let showReview = false;

  if (shoppingHistory.length > 0 && shoppingHistory[0].message !== "You have not made any purchases") {
    shoppingHistory.map((shop) => {
      shop.Movies.map((movie) => {
        if (movie.id === id) {
          showReview = true;
        }
      })
    });
  } else {
    showReview = false;
  }

  return (
    <div className={style.main}>
      <SideBar />
      <div className={style.detailMain}>
        <BackButton />
        <div className={style.detail}>
          <div className={style.poster}>
            <img src={selectedMovie.image}></img>
            {/* acá podría haber un render condicional, si ya esta en favorites: opción para sacarlo,
                    si no esta opción para agregarlo */}
            {/* <button onClick={favoriteHandler}>Add to favorites</button> */}
          </div>

          <div className={style.description}>
            <h2 className={style.title}>{selectedMovie.title}</h2>
            <h3>Duration: <label>{selectedMovie.duration} min</label></h3>
            {/* <p>Rating: 7/10</p> */}
            <p>{selectedMovie.description}</p>
            <p className={style.price}>Price: <label>$5.00 USD</label></p>
            <button onClick={handleAddCart} type="submit">Add to cart</button>
            <p>{addedToCart ? "Movie has been added to your cart" : ""}</p>
          </div>
        </div>
        <div className={style.review}>
          {reviews ? <div><h2>Reviews</h2>
            {reviews.map((review) => (
              <div>
                <h3>{review.title}</h3>
                <p>Rating: {review.rating}/10</p>
                <p>{review.description}</p>
              </div>
            ))}
          </div> : ""}
          <br></br>
          {showReview
            ? <div> <h2 name="review">Share your Review and Rating of this Movie</h2>
              <label name="title">Title of your Review</label><br></br>
              <input name="title" value={newReview.title} onChange={handleChange} type="text"></input><br></br><br></br>
              <label name="description">Description</label><br></br>
              <textarea value={newReview.description} name="description" onChange={handleChange} placeholder="Share your opinion about this movie..."></textarea><br></br><br></br>
              <label>Rating</label><br></br>
              <select name="rating" value={newReview.rating} onChange={handleChange}>
                <option value="">Select a rating</option>
                <option value={1}>1/10</option>
                <option value={2}>2/10</option>
                <option value={3}>3/10</option>
                <option value={4}>4/10</option>
                <option value={5}>5/10</option>
                <option value={6}>6/10</option>
                <option value={7}>7/10</option>
                <option value={8}>8/10</option>
                <option value={9}>9/10</option>
                <option value={10}>10/10</option>
              </select><br></br><br></br>
              <button onClick={addReview}>Send Review</button>
            </div>
            : <h1>Buy the movie to leave a review!</h1>}
        </div>
      </div>
    </div>
  );
};
export default Detail;
