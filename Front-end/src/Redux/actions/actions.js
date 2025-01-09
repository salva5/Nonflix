import axios from "axios";

import {
  GET_MOVIES,
  GET_DETAIL,
  SET_CURRENT_PAGE,
  GET_NAME,
  FILTER,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  USER_DATA,
  RESET_CART,
  CLEAR_USER_DATA,
  GET_FAVS,
  REMOVE_FAV,
  GET_GENRES,
  CLEAN_DETAIL,
  CLEAN_FAVS,
  DISABLE_ENABLE,
  GET_PURCHASED_MOVIES,
  GET_USERS,
  GET_BESTSELLERS,
  GET_BESTFAVORITES,
  SALES_BY_DATE,
  ACTIVE_USER,
  ACTIVE_USERADMIN,
  GET_ORDERS
} from "./actionsTypes";
import Swal from "sweetalert2";


export const getMovies = () => {
  return async (dispatch) => {
    try {
      const movie = await axios.get("/Nonflix/movies");
      const dataMovie = movie.data;
      dispatch({
        type: GET_MOVIES,
        payload: dataMovie,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
};
export const getUsers = () => {
  return async (dispatch) => {
    try {
      const data = await axios.get("/Nonflix/users");
      const users = data.data;
      dispatch({
        type: GET_USERS,
        payload: users,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
};
export const getOrders = () => {
  return async (dispatch) => {
    try {
      const data = await axios.get("/Nonflix/movies/orders");
      const orders = data.data;
      dispatch({
        type: GET_ORDERS,
        payload: orders,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const putMovie = (input, id) => {
  // console.log(input)
  // console.log(id)
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/Nonflix/movies/update/${id}`, input);
      console.log(data)
      
    } catch (error) {
      console.log(error.response)
      
    }
  }
  
};

export const getBestsellers = () => {
  return async (dispatch) => {
    try {
      const data = await axios.get("/Nonflix/bestsellers");
      const bestsellers = data.data;
      dispatch({
        type: GET_BESTSELLERS,
        payload: bestsellers,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const getBestfavorites = () => {
  return async (dispatch) => {
    try {
      const data = await axios.get("/Nonflix/bestfavorite");
      const bestfavorites = data.data;
      dispatch({
        type: GET_BESTFAVORITES,
        payload: bestfavorites,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
};
export const getSalesByDate = () => {
  return async (dispatch) => {
    try {
      const data = await axios.get("/Nonflix/salesbydate");
      const salesByDate = data.data;
      dispatch({
        type: SALES_BY_DATE,
        payload: salesByDate,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
};
export const getGenres = () => {
  return async (dispatch) => {
    try {
      const allGenres = await axios.get("/Nonflix/movies/genres");
      const genres = allGenres.data.map(genre => genre.id);
      dispatch({
        type: GET_GENRES,
        payload: genres,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
};
export const getByName = (parameters) => {
  const name = parameters[0];
  const year = parameters[1];
  const lang = parameters[2];

  return async (dispatch) => {
    try {
      let url = `/Nonflix/movies/name?name=${name}`;

      if (year !== undefined && year !== null) {
        url += `&year=${year}`;
      }

      if (lang !== undefined && lang !== null) {
        url += `&lang=${lang}`;
      }
      console.log(url);
      const getMovies = await axios.get(url);
      const response = getMovies.data;
      if (response.length > 0) {
        dispatch({
          type: GET_NAME,
          payload: response,
        });
      } else {
        dispatch({
          type: GET_NAME,
          payload: "No movies found",
        });
      }
    } catch (error) {
      const errorMsg = error.message;
      window.alert(errorMsg);
    }
  };
};

export const getDetailMovie = (id) => {
  return async (dispatch) => {
    try {
      const detail = await axios.get(`/Nonflix/movies/${id}`);
      const dataDetail = detail.data;
      dispatch({
        type: GET_DETAIL,
        payload: dataDetail,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const filterParameters = (parameters) => {
  const origin = parameters[0];
  const year = parameters[1];
  const lang = parameters[2];

  return async (dispatch) => {
    try {
      let url = `/Nonflix/movies/filters?origin=${origin}`;

      if (year !== undefined && year !== null) {
        url += `&year=${year}`;
      }

      if (lang !== undefined && lang !== null) {
        url += `&lang=${lang}`;
      }
      const getMovies = await axios.get(url);
      const moviesFiltered =
        origin === "Home" ? getMovies.data : getMovies.data.Movies;

      if (moviesFiltered.length > 0) {
        dispatch({
          type: FILTER,
          payload: moviesFiltered,
        });
      } else {
        dispatch({
          type: FILTER,
          payload: "No movies found",
        });
        Swal.fire({
          position: 'top',
          text: "No movies found",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      const errorMsg = error.response.data.message;
      Swal.fire({
        position: 'top',
        showConfirmButton: false,
        timer: 1000,
        text: "No movies found",

      });
      return errorMsg;
    }
  };
};
export const setCurrentPage = (currentPage) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: currentPage,
  };
};
export const addToCart = (movie) => {
  return {
    type: ADD_TO_CART,
    payload: movie,
  };
};
export const removeFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    payload: id,
  };
};
export const resetCart = () => {
  return {
    type: RESET_CART,
  };
};

export const registerUser = (values) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "/Nonflix/login",
        values
      );
      if (response.status !== 200) {
        throw new Error("Something went wrong!");
      } else {
        const userData = response.data;
        return dispatch({
          type: USER_DATA,
          payload: userData,
        });
      }
    } catch (error) {
      //const errorMsg = error.response.data.error? error.response.data.error : error.response.data;
      console.log(error);
      Swal.fire({
        title: "Oops!",
        text: error.response.data.error,
        icon: "error",
      });
    }
  };
};

export const login = (userInfo) => {
   console.log("login");
   return async (dispatch) => {
      try {
         const user = await axios.post(`/Nonflix/login/login`, userInfo);

         const userData = user.data;
         if(userData.active){
            return dispatch({
               type: USER_DATA,
               payload: userData,
            });

         }
      } catch (error) {
         const errorMsg = error.response.data.error
            ? error.response.data.error
            : error.response.data;
         Swal.fire({
            title: "Oops!",
            text: errorMsg,
            icon: "error",
         });
      }
   };
};
export const updateUser = ({ id, name, password, token, image }) => {
  let reqBody;
  if (name !== "" && password !== "" && image !== "") reqBody = { id, name, password, image };
  if (name !== "" && password !== "" && image === "") reqBody = { id, name, password };
  if (name !== "" && password === "" && image !== "") reqBody = { id, name, image };
  if (name === "" && password !== "" && image !== "") reqBody = { id, password, image };
  if (name === "" && password !== "") reqBody = { id, password };
  if (password === "" && name !== "") reqBody = { id, name };
  if (name === "" && password === "" && image !== "") reqBody = { id, image };
  return async (dispatch) => {
    try {
      const user = await axios.put(
        "/Nonflix/login/update",

        reqBody
        ,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const userData = {
        id: user.data.id,
        name: user.data.name,
        email: user.data.email,
        token: token,
      };
      Swal.fire({
        title: "Great!",
        text: "Your data has been successfully updated!",
        icon: "success",
      });
      return dispatch({
        type: USER_DATA,
        payload: userData,
      });

    } catch (error) {
      console.log(error);

      Swal.fire({
        title: "Oops!",
        text: error.response.data.error,
        icon: "error",
      });
    }
  };
};
export const clearUserData = () => {
  return {
    type: CLEAR_USER_DATA,
  };
};
export const addFav = (movieId, userId) => {
  return async () => {
    await axios.post(`/Nonflix/movies/fav?movieId=${movieId}&userId=${userId}`)
  }
}
export const getFavs = (userId) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/Nonflix/movies/fav?userId=${userId}`)

    dispatch({ type: GET_FAVS, payload: data })
  }
}
export const removeFav = (movieId, userId) => {
  return async (dispatch) => {
    const { data } = await axios.delete(`/Nonflix/movies/fav?movieId=${movieId}&userId=${userId}`)

    dispatch({ type: REMOVE_FAV, payload: data })
  }
}

export const cleanDetail = () => {
  return { type: CLEAN_DETAIL }
}
export const cleanFavs = () => {
  return (dispatch) => {
    dispatch({ type: CLEAN_FAVS })
  }
}

export const disableEnableMovies = (id, disabled) => {
  disabled = !disabled
  return async (dispatch) => {
    await axios.put(`/Nonflix/movies/disabled`, { disabled , id })

    dispatch({ type: DISABLE_ENABLE, payload: id })
  }
}
export const getPurchasedMovies = (userId) => {
  return async(dispatch) => {
    try {
      const { data } = await axios(`/Nonflix/shopping/purchasedMovies?userId=${userId}`)
      
      dispatch({
        type: GET_PURCHASED_MOVIES,
        payload: data
      })
      
    } catch (error) {
      console.log(error.message);
    }


  }
} 

export const disableEnableUsers = (id, token, active) => {
  const updatedActive = !active;
  return async (dispatch) => {
    await axios.put("/Nonflix/login/update", { id, password: "", active: updatedActive },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: ACTIVE_USER, payload: id })
  }
}
export const disableEnableUsersAdmin = (id, token, admin) => {
  const updatedAdmin = !admin;
  return async (dispatch) => {
    await axios.put("/Nonflix/login/update", { id, password: "", admin: updatedAdmin },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: ACTIVE_USERADMIN, payload: id })
  }
}