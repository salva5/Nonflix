import { useEffect, useState, useRef } from "react";
import { postMovieValidation } from "../Validation/postMovieValidation";
import axios from "axios";
import style from "./PostMovie.module.css";
import Swal from "sweetalert2";
import "@sweetalert2/theme-dark/dark.css";
import logo from "../../assets/NONFLIX-LOGO.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../../Redux/actions/actions";
import AdminSideBar from "../AdminSideBar/AdminSideBar";

//http://localhost:3001/Nonflix/movies/genres

const PostMovie = () => {
  const dispatch = useDispatch();
  const [movie, setMovie] = useState({
    title: "",
    duration: "",
    trailer: "",
    year: "",
    description: "",
    torrent: null,
    language: "",
    image: "",
    genre: [],
  });

  useEffect(() => {
    dispatch(getGenres());
  }, []);
  const genres = useSelector((state) => state.genres);

  const [error, setError] = useState({
    title: "",
    duration: "",
    trailer: "",
    year: "",
    description: "",
    language: "",
    image: "",
    torrent: "",
  });

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
    setError({
      ...error,
      [e.target.name]: postMovieValidation(e.target.name, e.target.value),
    });
  };

  const handleFile = (e) => {
    if (
      e.target.files[e.target.files.length - 1].name.split(".").pop() !==
      "torrent"
    ) {
      setError({ ...error, torrent: "You must upload a torrent file" });
      return;
    }
    setError({ ...error, torrent: "" });
    setMovie({ ...movie, torrent: e.target.files[e.target.files.length - 1] });
  };

  const handleSubmit = async () => {
    try {
      setMovie({ ...movie, year: Number(movie.year) });
      await axios.post(`/Nonflix/movies/`, movie);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Movie added to catalog",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "We cannot create this new movie. Check for errors please.",
        footer: error.response.data,
      });
    }
  };

  const handleGenre = (e) => {
    if (movie.genre.includes(e.target.value)) {
      setMovie({
        ...movie,
        genre: [...movie.genre.filter((genre) => genre !== e.target.value)],
      });
    } else {
      setMovie({ ...movie, genre: [...movie.genre, e.target.value] });
    }
  };

  const [activeButton, setActiveButton] = useState("image-button");

  // cloudinary upload widget
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dy8pp1s5f",
        uploadPreset: "imagenes_admins",
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          const imageUrl = result.info.url;
          if (activeButton === "image-button") {
            setMovie((prevMovie) => ({
              ...prevMovie,
              image: imageUrl,
            }));
          } else if (activeButton === "trailer-button") {
            setMovie((prevMovie) => ({
              ...prevMovie,
              trailer: imageUrl,
            }));
          }
        }
      }
    );
  }, [activeButton]);

  const handleImageUpload = () => {
    setActiveButton("trailer-button");
    widgetRef.current.open();
    // console.log(activeButton)
  };

  const handleTrailerUpload = () => {
    setActiveButton("image-button");
    widgetRef.current.open();
    // console.log(activeButton)
  };

  return (
    <div className={style.globalContainer}>
      <AdminSideBar />
      <div className={style.createMovieContainer}>
        <div className={style.h1}>
          <h1 className={style.h1}>Add new movie to catalog</h1>
          {/* <Link to="/Dashboard"><button className={style.dashboardButton}>Back to dashboard</button></Link> */}
        </div>
        <div className={style.firstContainer}>
          <div className={style.firstFormDiv}>
            <div className={style.inputDivs}>
              <label>Title</label>
              <input
                className={error.title !== "" ? "wrong" : ""}
                name="title"
                value={movie.title}
                onChange={handleChange}
                type="text"
              ></input>
            </div>
            <div className={style.inputDivs}>
              <p className={style.notOk}>{error.title}</p>
            </div>
            <div className={style.inputDivs}>
              <label>Year</label>
              <input
                className={error.year !== "" ? "wrong" : ""}
                name="year"
                value={movie.year}
                onChange={handleChange}
                type="text"
              ></input>
            </div>
            <div className={style.inputDivs}>
              <p className={style.notOk}>{error.year}</p>
            </div>
            <div className={style.inputDivs}>
              <label>Duration (mins)</label>
              <input
                className={error.duration !== "" ? "wrong" : ""}
                name="duration"
                value={movie.duration}
                onChange={handleChange}
                type="text"
              ></input>
            </div>
            <div className={style.inputDivs}>
              <p className={style.notOk}>{error.duration}</p>
            </div>
            <div className={style.inputDivs}>
              <label>Description</label>
              <textarea
                className={style.description}
                name="description"
                value={movie.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <br></br>
            <div className={style.inputDivs}>
              <label>Torrent</label>
              <input
                className={style.torrentInput}
                name="torrent"
                onChange={handleFile}
                type="file"
              ></input>
            </div>
            <div className={style.inputDivs}>
              <p className={style.notOk}>{error.torrent}</p>
            </div>
            <div className={style.inputDivs}>
              <p className={style.notOk}>{error.description}</p>
            </div>
          </div>
          <div className={style.secondFormDiv}>
            <div className={style.inputDivs}>
              <label>Cover URL</label>
              <input
                className={error.image !== "" ? "wrong" : ""}
                name="image"
                value={movie.image}
                onChange={handleChange}
                type="text"
              ></input>
            </div>
            <div className={style.inputDivs}>
              <p className={`${style.notOk} ${style.spacing}}`}>
                {error.image}
              </p>

              <button
                className={style.uploadButton}
                onClick={handleImageUpload}
              >
                Upload Image
              </button>
              <img
                className={style.imageShown}
                src={movie.image ? movie.image : ""}
              ></img>
            </div>
            <div className={style.inputDivs}>
              <label>Trailer URL</label>
              <input
                className={error.trailer !== "" ? "wrong" : ""}
                name="trailer"
                value={movie.trailer}
                onChange={handleChange}
                type="text"
              ></input>
            </div>
            <div className={style.inputDivs}>
              <p className={style.notOk}>{error.trailer}</p>

              <button
                className={style.uploadButton}
                onClick={handleTrailerUpload}
              >
                Upload Trailer
              </button>
            </div>
          </div>
          <div className={style.thirdFormDiv}>
            <div className={style.inputDivs}>
              <label>Language</label>
              <select
                className={error.language !== "" ? "wrong" : ""}
                name="language"
                value={movie.language}
                onChange={handleChange}
              >
                <option value="">Select a Language</option>
                <option value="es">Spanish</option>
                <option value="en">English</option>
                <option value="fr">French</option>
              </select>
            </div>
            <div className={style.inputDivs}>
              <p className={style.notOk}>{error.language}</p>
            </div>
            <p className={style.generosMargin}>Genres</p>
            <div className={style.checkboxContainer}>
              {genres.map((genre, index) => {
                return (
                  <div>
                    <input
                      key={index}
                      name="genre"
                      value={genre}
                      onChange={handleGenre}
                      type="checkbox"
                    />
                    <label>{genre}</label>
                  </div>
                );
              })}
            </div>
            <div className={style.inputDivs}>
              <p className={style.notOk}>
                {movie.genre.length === 0 ? "Add at least one genre" : ""}
              </p>
            </div>
          </div>
        </div>
        {Object.values(movie).every(
          (value) => value !== "" && value !== null
        ) &&
        Object.values(error).every(
          (errorMsg) => errorMsg === "" && movie.genre.length > 0
        ) ? (
          <button className={style.okVal} onClick={handleSubmit}>
            Upload Movie
          </button>
        ) : (
          <div className={style.notOk}>Complete all fields correctly</div>
        )}
      </div>
    </div>
  );
};
export default PostMovie;
