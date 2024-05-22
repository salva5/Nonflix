import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../Redux/actions/actions";
import style from "./Pagination.module.css";

const Pagination = (paginationSize) => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);

  const handlePageClick = (page) => {
    dispatch(setCurrentPage(page));
  };
  return (
    <div className={style.pagination}>
      {Array.from({ length: paginationSize.paginationSize }).map((_, index) => (
        <div
          onClick={(event) => handlePageClick(index + 1, event)}
          className={currentPage === index + 1 ? style.actual : ""}
          key={index + 1}
          id={index + 1}
        >
          { index + 1}
        </div>
      ))}
    </div>
  );
};

export default Pagination;
