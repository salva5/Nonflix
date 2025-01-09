import React from "react";
import styles from "./Login.module.css";
import { NavLink, useNavigate } from "react-router-dom/dist";
import { Formik } from "formik";
import GoogleAuth from "../GoogleAuth/GoogleAuth";
import { login as loginAction } from "../../Redux/actions/actions";
import { useDispatch } from "react-redux";
import validations from "../Profile/validations";

const Login = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const loginUser = (values) => {
      dispatch(loginAction(values))
      .then((response) => {
         if (response !== "" && response !== undefined) {
            navigate("/Home");
         }
         // user.admin ? navigate('/Dashboard') : navigate('/Home')
      });
   };
   return (
      <div className={styles.container}>
         <div className={styles.formContainer}>
            <h2>Login</h2>
            <p>Welcome back! Sign in to your account to start enjoying!</p>
            <Formik
               initialValues={{name:"nameDefault", email: "", password: ""}}
               validate = {validations}
               onSubmit = {loginUser}
            >
            {
               ({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit
               }) => (
                  <form onSubmit={handleSubmit} className={styles.form}>
                     <div className={styles.fields}>
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
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.password}
                           placeholder="Password"
                        />
                     </div>
                     {
                        touched.email && errors.email 
                           ? (<span>{errors.email && touched.email && errors.email}</span>) 
                           : touched.password && touched.password 
                              ? (<span>{errors.password && touched.password && errors.password}</span>) 
                              : null
                     }
                     <button type="submit">Sign in</button>
                  </form>
               )
            }
            </Formik>
            <GoogleAuth />
            <span className={styles.registerLink}>
               New to NonFlix? <NavLink to="/Register">Register Now!</NavLink>
            </span>
         </div>
      </div>
   );
};

export default Login;
