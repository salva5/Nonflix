import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../SideBar/SideBar";
import style from "./Profile.module.css";
import { updateUser } from "../../Redux/actions/actions";
import validations from "./validations";
import ShoppingHistory from "../ShoppingHistory/ShoppingHistory";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AdminSideBar from "../AdminSideBar/AdminSideBar";

const Profile = () => {
  const navigate = useNavigate()
  const userData = useSelector((state) => state.user);
  const userFirstName = userData.name.split(" ");
  const [updatedData, setUpdatedData] = useState({ name: "", password: "" });
  const [profileImage, setProfileImage] = useState(userData.image);
  const [errors, setErrors] = useState({ name: "", password: "" });
  const [checkedFields, setCheckedFields] = useState({
    checkboxName: false,
    checkboxPassword: false,
  });
  const dispatch = useDispatch();

  //
  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;

    if (type === "checkbox") {
      setCheckedFields({ ...checkedFields, [name]: checked });
    } else {
      setUpdatedData({ ...updatedData, [name]: value });
    }
    const inputsValidated = validations(updatedData);
    setErrors(inputsValidated);
    if (
      errors.name === "" &&
      errors.password === ""
    ) {
      const button = document.querySelector("#submit");
      button.disabled = false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userUpdate = {
      id: userData.id,
      name: checkedFields.checkboxName ? updatedData.name : userData.name,
      password: checkedFields.checkboxPassword ? updatedData.password: userData.password,
      image: profileImage,
      token: userData.token,
    };
    dispatch(updateUser(userUpdate));
  };

 // cloudinary upload widget
 const cloudinaryRef = useRef();
 const widgetRef = useRef()
 
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {  
        cloudName: "dy8pp1s5f",
        uploadPreset: "imagenes_admins",
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          const imageUrl = result.info.url;
          setProfileImage(imageUrl)
        }
      }
    );
  }, []);

  
  return (
    <div className={style.main}>
      {userData.admin ? <AdminSideBar /> : <SideBar />
}
      <div className={style.profile}>
        <h2>
          Hi <label className={style.name}>{userFirstName[0]}</label>, welcome
          to your profile!
        </h2>
        <form onSubmit={handleSubmit}>
          <img src={profileImage === "" ? userData.image : profileImage} />
          <button
            type="button"
            className="uploadButton "
            onClick={() => widgetRef.current.open()}
          >
            Update Image
          </button>
          <div className={style.data}>
            <div className={style.important}>
              <h3>Please note:</h3>
              <ul>
                <li className={style.color}>
                  Select the data you want to update
                </li>
                <li>Your name must be at least 10 characters</li>
                <li>Your name cannot be empty</li>
                <li>Your password cannot be shorter than 6 characters</li>
              </ul>

              <h3>
                If any of these requirements are not met, your data will not be
                updated
              </h3>
            </div>
            <label>Name: </label>
            <div className={style.check}>
              <input
                className={style.checkbox}
                type="checkbox"
                name="checkboxName"
                onChange={handleChange}
              />
              <input
                name="name"
                placeholder={userData.name}
                value={updatedData.name}
                onChange={handleChange}
              />
            </div>
            <label className={style.errors}>{errors.name}</label>
            <label>E-mail: </label>
            <h3>{userData.email}</h3>
            <label className={style.labelPsw}>Change password: </label>
            <div className={style.check}>
              <input
                className={style.checkbox}
                type="checkbox"
                name="checkboxPassword"
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                value={updatedData.password}
                onChange={handleChange}
              ></input>
            </div>
            <label className={style.errors}>{errors.password}</label>
            <button type="submit" disabled={true} id="submit">Update data</button>
          </div>
        </form>
        <ShoppingHistory/>
      </div>
        
      
    </div>
  );
};

export default Profile;
