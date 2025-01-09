import style  from './NonRegisteredHome.module.css'
import ImagesGallery from '../Component/ImagesGallery/ImagesGallery';
const NonRegisteredHome = () =>  {
   return (
      <div className={style.main}>
         <ImagesGallery/>
      </div>
   )
}

export default NonRegisteredHome;