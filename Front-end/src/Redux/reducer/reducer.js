import {
  CLEAR_USER_DATA,
  GET_BESTFAVORITES,
  GET_BESTSELLERS,
  GET_FAVS,
  GET_ORDERS,
  REMOVE_FAV,
} from "../actions/actionsTypes";
import {
  GET_MOVIES,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  GET_DETAIL,
  GET_NAME,
  SET_CURRENT_PAGE,
  SET_FILTER_PARAMETERS,
  FILTER,
  RESET_CART,
  USER_DATA,
  GET_GENRES,
  CLEAN_DETAIL,
  CLEAN_FAVS,
  DISABLE_ENABLE,
  GET_PURCHASED_MOVIES,
  GET_USERS,
  SALES_BY_DATE,
  ACTIVE_USER,
  ACTIVE_USERADMIN
} from "../actions/actionsTypes";

const initialState = {
  Allmovies: [],
  Cart: [],
  movieDetail: [],
  currentPage: 1,
  itemsPerPage: 12,
  filterParameters: ["Home", null, null],
  filteredMovies: [],
  user: {},
  genres: [],
  FavoriteMovies: [],
  shoppingHistory: [],
  allUsers: [],
  bestsellers: [],
  bestfavorites: [],
  salesByDate: [],
  orders: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        Allmovies: action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
      case GET_ORDERS:
        return {
          ...state,
          orders: action.payload,
        };
    case GET_BESTSELLERS:
      return {
        ...state,
        bestsellers: action.payload,
      };
    case GET_BESTFAVORITES:
      return {
        ...state,
        bestfavorites: action.payload,
      };
    case SALES_BY_DATE:
      return {
        ...state,
        salesByDate: action.payload,
      };
    case GET_DETAIL:
      return {
        ...state,
        movieDetail: action.payload,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case CLEAN_DETAIL:
      return {
        ...state,
        movieDetail: {},
      };
    case GET_NAME:
      return {
        ...state,
        filteredMovies: action.payload,
      };
    case SET_FILTER_PARAMETERS:
      return {
        ...state,
        filterParameters: action.payload,
      };

    case FILTER: {
      return {
        ...state,
        filteredMovies: action.payload,
      };
    }
    case USER_DATA: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case CLEAR_USER_DATA: {
      return {
        ...state,
        user: {},
        filteredMovies: [],
        filterParameters: ["Home", null, null],
        bestfavorites: [],
        bestsellers: [],
        salesByDate: [],
        allUsers: [],
        Cart: [],
        orders: []
      };
    }
    case ADD_TO_CART: {
      action.payload.price = 5.0;
      const repeated = [...state.Cart].find(
        (movie) => movie.id === action.payload.id
      );
      return {
        ...state,
        Cart: repeated ? [...state.Cart] : [...state.Cart, action.payload],
      };
    }
    case REMOVE_FROM_CART: {
      const deleteCart = [...state.Cart].filter(
        (movie) => movie.id !== action.payload
      );
      return {
        ...state,
        Cart: deleteCart,
      };
    }
    case RESET_CART:
      return {
        ...state,
        Cart: [],
      };
    case GET_FAVS:
      return {
        ...state,
        FavoriteMovies: action.payload,
      };
    case REMOVE_FAV:
      return {
        ...state,
        FavoriteMovies: action.payload,
      };
    case CLEAN_FAVS:
      return {
        ...state,
        FavoriteMovies: [],
      };
    case DISABLE_ENABLE: {
      const movies = [...state.Allmovies];
      for (const movie of movies) {
        if (movie.id === action.payload) {
          movie.disabled = !movie.disabled;
        }
      }
      return {
        ...state,
        Allmovies: movies,
      };
    }
    case GET_PURCHASED_MOVIES:
      return {
        ...state,
        shoppingHistory: action.payload,
      };
      
    case ACTIVE_USER: {
        const users = [...state.allUsers];
        for (const user of users) {
          if (user.id === action.payload) {
            user.active = !user.active;
          }
        }
        return {
          ...state,
          allUsers: users,
        };
      }
    case ACTIVE_USERADMIN: {
        const users = [...state.allUsers];
        for (const user of users) {
          if (user.id === action.payload) {
            user.admin = !user.admin;
          }
        }
        return {
          ...state,
          allUsers: users,
        };
      }
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
