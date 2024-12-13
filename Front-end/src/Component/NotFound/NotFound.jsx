import { useNavigate } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import style from './NotFound.module.css';

const NotFound = () => {

    // Para implementar la página NotFound agregar lo siguiente como una Route en App.jsx:
    // <Route path="*" element={<NotFound/>}/>
    // Cualquier ruta no especificada renderizará NotFound

    const navigate = useNavigate();
    const goHome = () => {
        navigate("/home")//puse "/" como la ruta de home, cambiarlo si no es así
    };

    return(
        <div className={style.main}>
        
        <div className={style.notFound}>
            <h1>Oops! Page not found</h1>
            <h2>404 Error</h2>
            <h2></h2>
            <button onClick={goHome}>Back to Home</button>
        </div>
        </div>
    )
};
export default NotFound;