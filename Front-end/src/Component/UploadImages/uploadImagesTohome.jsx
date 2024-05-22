import React, {  useState, useRef, useEffect } from 'react';
import styles from './UploadImages.module.css'

export default function uploadImagesTohome() {

    // const cloudName = 'dy8pp1s5f'; 
    // const uploadPreset = 'imagenes_admins'; 
  
    // const [imageUrl, setimageUrl] = useState(null);
    // const [imageAlt, setimageAlt] = useState(null);

    // const openWidgetToHome = () => {
    //     const widget = cloudinary.createUploadWidget(
    //       {
    //         cloudName: cloudName, 
    //         uploadPreset: uploadPreset,
    //         tags: ["gallery-images"],
    //       },
    //       (error, result) => {
    //         if (result.event === "success") {
    //           setimageUrl(result.info.secure_url);
    //           setimageAlt(`Una imagen de ${result.info.original_filename}`);
    //         }
    //       }
    //     );
    //     widget.open();
    //   };
      
    const [imageHome, setImageHome] = useState()

    const cloudinaryRef = useRef();
    const widgetRef = useRef()
    
    useEffect(()=>{
        cloudinaryRef.current = window.cloudinary
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'dy8pp1s5f',
            uploadPreset: 'imagenes_admins'
        }, function(error, result){
          if (!error && result && result.event === 'success') {
            const imageUrl = result.info.url;
            setImageHome(imageUrl); 
          }
        })
    }, [])


  return (
    <div>
        uploadImagesTohome
    
        {/* <button type="button" className={styles.leftButton} onClick={openWidgetToHome}>
            Upload Image to Home
          </button> */}
    
    <button className={styles.leftButton} onClick={()=> widgetRef.current.open()}>
                  Upload
    </button>

          <img src={imageHome}  />
    </div>
  )
}
