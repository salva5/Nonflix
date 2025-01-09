import { useNavigate, NavLink } from 'react-router-dom';
import { registerUser } from '../../Redux/actions/actions';
import GoogleAuth from '../GoogleAuth/GoogleAuth';
import styles from './Register.module.css';
import { Formik } from "formik";
import { useState} from "react";
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import validations from '../Profile/validations';

const Register = () => {
   const [successMessage, setSuccessMessage] = useState("");
   const [welcomeMsg, setWelcomeMsg] = useState(false)
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleRegister = (values) => {
      dispatch(registerUser(values)).then((response) => {
         if (response !== "" && response !== undefined) {
            Swal.fire({
               icon: 'success',
               title: '¡Successful registration! Welcome.',
               showConfirmButton: false,
               timer: 3000
            }).then(() => {
               navigate("/Home");
            });
         }
      });
   };

   return (
      <div className={styles.container}>
         <div className={styles.main}>
            <h2>Create Account</h2>
            <p>Sign up to access the best movies!</p>
            <Formik
               initialValues={{ name: "", email: "", password: "" }}
               validate={validations}
               onSubmit={handleRegister}
            >
               {
                  ({
                     values,
                     errors,
                     touched,
                     handleChange,
                     handleBlur,
                     handleSubmit,
                     /* and other goodies */
                  }) => (
                     <form onSubmit={handleSubmit}  className={styles.registerForm}>
                        <div className={styles.fields}>
                           <input  
                              type="text"
                              name="name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.name}
                              placeholder="Name"
                           />
                           <input
                              type="email"
                              name="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                              placeholder="Email"
                           />
                           <input
                              type="password"
                              name="password"
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Password"
                           />
                        </div>
                        {
                           touched.name && errors.name 
                              ? <span>{errors.name && touched.name && errors.name}</span>
                              : touched.email && errors.email 
                                 ? <span>{errors.email && touched.email && errors.email}</span>
                                 : touched.password && errors.password 
                                    ? <span>{errors.password && touched.password && errors.password}</span>
                                    : null
                        }
                        <button type="submit">Sign up</button>
                        {
                           welcomeMsg && (
                              <div>
                                 <p>{successMessage}</p>
                              </div>
                           )
                        }
                     </form>
                  )
               }
            </Formik>
            <GoogleAuth/>
            <span className={styles.loginLink}>
               Already have an account?<NavLink to="/Login"> Sign in!</NavLink>
            </span>
         </div>

      </div>
   );
};

export default Register;
