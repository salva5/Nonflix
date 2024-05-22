import { useDispatch, useSelector } from "react-redux";
import style from "./Filters.module.css";
import {
  getMovies,
  setCurrentPage,
  filterParameters,
  getByName,
} from "../../Redux/actions/actions";

const Filters = () => {
  const dispatch = useDispatch();
  const stateFilterParams = useSelector((state) => state.filterParameters);
  const allMovies = useSelector((state) => state.Allmovies);
  const filteredMovies = useSelector((state) => state.filteredMovies);

  const baseForYears = allMovies; //|| filteredMovies !== "Movies not found"
  const allYears = baseForYears.map((movie) => {
    return movie.year;
  });

  if(filteredMovies === "No movies found"){
    const copyFilterParameters = stateFilterParams;
    copyFilterParameters[1] = "";
    copyFilterParameters[2] = "";
    copyFilterParameters[3] = "";
    
    //copyFilterParameters[3] = "";
      const yearSelector = document.getElementById("selectYear");
      // yearSelector.value = "year";
      const langSelector = document.getElementById("selectLanguage");
      // langSelector.value = "lang";
      const searchInput = document.getElementById("searchInput");
      // searchInput.value = ""
    dispatch(filterParameters(copyFilterParameters))
  }

  let yearsToDisplay = allYears.filter((item, index) => {
    return allYears.indexOf(item) === index;
  });

  yearsToDisplay = yearsToDisplay.sort();
  const handleYearChange = (event) => {
    const copyFilterParameters = stateFilterParams;
    copyFilterParameters[1] = event.target.value;
    if (copyFilterParameters[3] === "search") {
      dispatch(getByName(copyFilterParameters));
    } else {
      dispatch(filterParameters(copyFilterParameters));
    }
    dispatch(setCurrentPage(1));
  };

  const handleLangChange = (event) => {
    const copyFilterParameters = stateFilterParams;
    copyFilterParameters[2] = event.target.value;
    if (copyFilterParameters[3] === "search") {
      dispatch(getByName(copyFilterParameters));
    } else {
      dispatch(filterParameters(copyFilterParameters));
    }
    dispatch(setCurrentPage(1));
  };

  const handleReset = () => {
    const input = document.querySelector("#searchInput");
    input.value = "";
    const copyFilterParameters = stateFilterParams;
    copyFilterParameters[1] = null;
    copyFilterParameters[2] = null;
    if (copyFilterParameters[3] === "search") {
      copyFilterParameters[0] = "Home";
    }
    dispatch(filterParameters(copyFilterParameters));
    const selectLanguage = document.getElementById("selectLanguage");
    if (selectLanguage) {
      selectLanguage.value = "lang";
    }
    const selectYear = document.getElementById("selectYear");
    if (selectYear) {
      selectYear.value = "year";
    }
  };
  return (
    <div className={style.filters}>
      <h4>Filter by:</h4>

      <div className={style.year}>
        <select
          id="selectYear"
          name="year"
          onChange={(event) => handleYearChange(event)}
        >
          <option value="year">Year</option>

          {yearsToDisplay.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div className={style.lang}>
        <select
          id="selectLanguage"
          onChange={(event) => handleLangChange(event)}
        >
          <option value="lang">Language</option>
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
      </div>
      <button onClick={() => handleReset()}>Reset filters</button>
    </div>
  );
};

export default Filters;
