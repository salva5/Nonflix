import {register} from 'swiper/element/bundle'
register();
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import {Swiper, SwiperSlide} from 'swiper/react';
import { Autoplay, Navigation} from "swiper/modules"
import style from './ImagesGallery.module.css'


export default function ImagesGallery() {


  const data = [
    {id: '1', image: 'https://res.cloudinary.com/dy8pp1s5f/image/upload/v1696405506/Nonfilx_admins/cqxtgsws0klfjibdnxg7.jpg'},
    {id: '2', image: 'https://res.cloudinary.com/dy8pp1s5f/image/upload/v1696853069/Nonfilx_admins/sk5hhut8b9kg88hstq2g.jpg'},
    {id: '3', image: 'https://res.cloudinary.com/dy8pp1s5f/image/upload/v1696821127/Nonfilx_admins/tasqbv2mxo5pck96uiw5.jpg'},
    {id: '4', image: 'https://res.cloudinary.com/dy8pp1s5f/image/upload/v1696405635/Nonfilx_admins/tgr0jwqsejcvleiceexm.jpg'},
    {id: '5', image: 'https://res.cloudinary.com/dy8pp1s5f/image/upload/v1696316301/Nonfilx_admins/vzzi8sdqeyemiiwti7aa.jpg'},
    {id: '6', image: 'https://res.cloudinary.com/dy8pp1s5f/image/upload/v1696829100/Nonfilx_admins/tnesyzyccxoceszcr0df.webp'},
  ]

  return (
    <div className={style.swiper}>

      <Swiper
        
        modules={[Autoplay, Navigation]}
        slidesPerView={1}
        pagination={{clickable: true}}
        autoplay
        navigation
      >
          {data.map((item)=> (
            <SwiperSlide key={item.id} className={style.slideItem}>
              <img
              className={style.img}
              src={item.image}
              alt='Slider'
              
              />
            </SwiperSlide>
          ))}
      </Swiper>


    </div>
  )
}
