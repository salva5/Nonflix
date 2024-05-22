import React, {  useState } from 'react';
import styles from './UploadImages.module.css'

const UploadImages = () => {

  // const cloudName = 'dy8pp1s5f'; 
  // const uploadPreset = 'imagenes_admins'; 

  // const [imageUrl, setimageUrl] = useState(null);
  // const [imageAlt, setimageAlt] = useState(null);




  // const openWidget = () => {
  //   const widget = cloudinary.createUploadWidget(
  //     {
  //       cloudName: cloudName, 
  //       uploadPreset: uploadPreset,
  //     },
  //     (error, result) => {
  //       if (result.event === "success") {
  //         setimageUrl(result.info.secure_url);
  //         setimageAlt(`Una imagen de ${result.info.original_filename}`);
  //       }
  //     }
  //   );
  //   widget.open();
  // };

  // console.log(imageUrl)



  return (
    <div >

          {/* <button type="button" className={styles.leftButton} onClick={openWidget}>
            Upload Image
          </button>


        <p>your image:</p>
        {imageUrl && (
          <img src={imageUrl} alt={imageAlt} className={styles.displayedImage} />
        )}
 */}

    </div>
  );
};

export default UploadImages;





