import style from "./LogInMenu.module.css";
import logo from "../../assets/NONFLIX-LOGO.png";
import { Link, useLocation } from "react-router-dom/dist";

const LogInMenu = () => {
   const { pathname } = useLocation();
   return (
      <div className={(pathname == "/Register" || pathname == "/Login") ? style.header2 : style.header}>
         <div className={style.logo}>
            <Link to="/">
               <img src={logo} alt="NonFlix" />
            </Link>
         </div>
         <div className={style.options}>
            <ul>
               <Link to="/Register">
                  <li>Register Now</li>
               </Link>
               <Link to="/Login">
                  <li>Login</li>
               </Link>
            </ul>
         </div>
      </div>
   );
};

export default LogInMenu;
