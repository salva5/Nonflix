import { Link } from "react-router-dom";
import style from "./MoviesCart.module.css"
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../Redux/actions/actions";



const MoviesCart = ({title, image, id, price}) => {
    const dispatch = useDispatch()
    const handleDelete = () => {
        dispatch(removeFromCart(id))
    }

    return (
        <div className={style.divMoviesCart}>
            <Link to ={`/Detail/${id}`}>
                <img src={image} alt="image" />
            </Link>
            <div>
            <Link to ={`/Detail/${id}`} className={style.title}>
                <h3>{title}</h3>
            </Link>

            <p>Price: ${price.toFixed(2)} USD</p>
            <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default MoviesCart;