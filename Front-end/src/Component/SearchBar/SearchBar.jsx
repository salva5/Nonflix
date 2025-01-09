import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByName } from "../../Redux/actions/actions";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
   const [inputSearch, setInputSearch] = useState("");
   const dispatch = useDispatch();
   const stateFilterParams = useSelector((state) => state.filterParameters);

   const handleInput = (e) => {
      setInputSearch(e.target.value);
   };

   const handleSearch = (e) => {
      e.preventDefault();
      const copyFilterParameters = stateFilterParams;
      copyFilterParameters[0] = inputSearch;
      copyFilterParameters[3] = "search";
      dispatch(getByName(copyFilterParameters));
   };

   return (
      <>
         <form className={styles.search}>
            <input
               name="search"
               value={inputSearch}
               placeholder="Search by title"
               onChange={handleInput}
               id="searchInput"
            />
            <button 
               onKeyDown={handleSearch} 
               onClick={handleSearch}>
               Search
            </button>

         </form>
      </>
   );
};
export default SearchBar;
