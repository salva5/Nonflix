import style from './LogInMenu.module.css'
import logo from '../../assets/NONFLIX-LOGO.png';
import { Link } from 'react-router-dom/dist';

const LogInMenu = ()=> {
    return (
        <div className={style.header}>
        <div className={style.logo}>
            <Link to="/"><img src={logo} alt="NonFlix" /></Link>
        </div>
        <div className={style.options}>
            <ul>
                <Link to='/Register'><li>Register Now</li></Link>
                <Link to='/Login'><li>Log In</li></Link>
            </ul>
            </div>
        </div>
    )
}

export default LogInMenu;