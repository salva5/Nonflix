import style from "./ShoppingHistory.module.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPurchasedMovies } from "../../Redux/actions/actions";
import historyIcon from "../../assets/history_white_24dp.svg"

const ShoppingHistory = () => {
   const shoppingHistory = useSelector((state) => state.shoppingHistory);
   const user = useSelector((state) => state.user)
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(getPurchasedMovies(user.id));
      
   }, []);
   let repeatedDate = false;
   let date = "";
   const month = ["none","January","February","March","April","May","June","July","August","September","October","November","December"];
   return (
      <div className={style.divMain}>
         <div className={style.title}>
               <img className={style.historyIcon} src={historyIcon} alt="shopping" /> 
               <h2>Shopping History</h2>
         </div>
         {
         
         
         shoppingHistory?.map((buys) => {
            if(buys?.message) {
               return  <div key={buys.message}>
               <p>{buys.message}</p>
               </div>
            }
            let dateSplit = buys?.createdAt?.split("T");
            if (dateSplit && dateSplit[0] !== date) {
               repeatedDate = false;
               date = dateSplit[0];
               date = date.split('-');
               //console.log(date[0]);
            } else {
               repeatedDate = true;
            }
            

               return (
               
               <div key={buys.id}>
                  
                  {!repeatedDate && <p className={style.date}>Ordered: {`${month[date[1]]} ${date[2]}, ${date[0]}`} </p>}
                  <div className={style.shopMovie}>
                     {buys?.Movies?.map((movie) => {
                     return (
                        <div key={movie.id} className={style.movies}>
                           <img src={movie.image} alt="movie" />
                           <h4>{movie.title}</h4>
                           <p>$ 5.00 USD</p>
                        </div>
                     );
                     })}
                     <h4>Total: {buys.total} ARS</h4>
                  </div>
                  
               </div>
               );
            
            
         })
         }
      </div>
   );  
};

export default ShoppingHistory;
