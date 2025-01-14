import React, { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { login as loginAction, registerUser } from "../../Redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import styles from "./GoogleAuth.module.css"

export default function GoogleAuth() {
   const navigate = useNavigate();
   const { pathname } = useLocation();
   const dispatch = useDispatch();
   const user = useSelector((state)=> state.user);

   const [isRegistered, setIsRegistered] = useState(false);

   const [userGoogle, setUserGoogle] = useState({
      email: "",
      password: "",
      name: "",
      provider: "Google",
      image: "",
      admin: false,
      active: true,
   });

   const onSuccess = (credentialResponse) => {
      const credentialResponseDecoded = jwt_decode(credentialResponse.credential);

      setUserGoogle({
         ...userGoogle,
         email: credentialResponseDecoded.email,
         password: credentialResponseDecoded.jti,
         name: credentialResponseDecoded.name,
         image: credentialResponseDecoded.picture
      });
      // console.log(credentialResponseDecoded)

   };

   useEffect(() => {
      if (userGoogle.email) {
         if (pathname === "/Login" ) {
            dispatch(loginAction(userGoogle)).then((response) => {
            if(response.data !== "The user is not registered"){
                  setIsRegistered(true);
               }
         }).catch((error)=>  Swal.fire({
            title: "Oops!",
            text: user.activate ? 'User no Registerd' : "User Disabled, Contact to Support",
            icon: "error",
         }))
         
         }

         if (pathname === "/Register") {
         dispatch(registerUser(userGoogle)).then((response) => {
            if ((response !== "" && response !== undefined) && response !== "Existing user") {
               setIsRegistered(true);
               navigate("/Home");
            }
         });
      //     axios
      //       .post("http://localhost:3001/Nonflix/login", userGoogle)
      //       .then((response) => {
      //         alert("Successfully registered user");
      //         setIsRegistered(true);
      //       })
      //       .catch((error) => {
      //         alert("Error: Existing user");
      //       });
         }
      }
   }, [userGoogle]);

   useEffect(() => {
      // Access to Home
      if (isRegistered) {
         
         user.admin ? navigate("/Dashboard") : navigate("/Home");
      }
   }, [isRegistered, navigate]);

   return (
      <div>
         <br />
         {
            (pathname === "/Register" || pathname === "/Login") && <div>─────────── Or ───────────</div>  
         }
         <br />

         <GoogleLogin
            useOneTap
            onSuccess={ (codeResponse) => onSuccess(codeResponse)}
            onError={() => {
               console.log("Login Failed");
            }}
         />
      </div>
   );
}
