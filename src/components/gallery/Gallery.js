
import { useState } from "react";
import GalleryModal from "../../components/modals/GalleryModal";
import './Gallery.scss';
import noImageIcon from '../../assets/images/no-image.png';
import noVideoIcon from '../../assets/images/no-video.png';
import GalleryPhotoDefault from '../../assets/images/gallery-default.jpg'

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { useSelector } from 'react-redux';


function Gallery({ setModalOpen }) {

   const userData = useSelector(state => state.idyUser.data);
   const { gallery, videos } = userData.business;

   const [clickedImg, setClickedImg] = useState(null);
   const [currentIndex, setCurrentIndex] = useState(null);

   const handleClick = (src, index) => {
      setCurrentIndex(index);
      setClickedImg(src);
   };

   const handelRotationRight = () => {
      const totalLength = gallery.length;
      if (currentIndex + 1 >= totalLength) {
         setCurrentIndex(0);
         const newUrl = gallery[0];
         setClickedImg(newUrl);
         return;
      }
      const newIndex = currentIndex + 1;
      const newUrl = gallery.filter((item) => {
         return gallery.indexOf(item) === newIndex;
      });
      const newItem = newUrl[0];
      setClickedImg(newItem);
      setCurrentIndex(newIndex);
   };

   const handelRotationLeft = () => {
      const totalLength = gallery.length;
      if (currentIndex === 0) {
         setCurrentIndex(totalLength - 1);
         const newUrl = gallery[totalLength - 1];
         setClickedImg(newUrl);
         return;
      }
      const newIndex = currentIndex - 1;
      const newUrl = gallery.filter((item) => {
         return gallery.indexOf(item) === newIndex;
      });
      const newItem = newUrl[0];
      setClickedImg(newItem);
      setCurrentIndex(newIndex);
   };

   return (
      <>
         <div className="page gallery">
            <div className="header">
               <div className="title">
                  <label className="en">Gallery</label>
                  <label className="mr">गॅलरी</label>
                  <label className="hn">गॅलरी</label>
               </div>
               <div className="action">
                  <a href="#" onClick={(e) => { e.preventDefault(); setModalOpen({ 'ShareModal': true }) }} className="share-all">
                     <i className="fa-light fa-share-alt"></i>
                  </a>
               </div>
            </div>
            <div className="content">

               <div className={`gallery-sec ${gallery ? '' : 'not-configured'}`}>
                  <div className="title">
                     <label className="en">Photos</label>
                     <label className="mr">छायाचित्रे</label>
                     <label className="hn">छायाचित्र</label>
                  </div>
                  <div className="desc">
                     <label className="en">Few photos about business</label>
                     <label className="mr">व्यवसायाबद्दलची मोजकी छायाचित्रे</label>
                     <label className="hn">कुछ व्यावसायिक छायाचित्र</label>
                  </div>
                  <div className="images-area ">

                     {gallery ?
                        <div className="images-list">
                           {gallery.map((imgSrc, index) => {
                              return (
                                 <div className="img-item" key={index} onClick={() => handleClick(imgSrc, index)}>
                                    <LazyLoadImage
                                       effect="blur"
                                       src={imgSrc ? imgSrc : GalleryPhotoDefault}
                                    />
                                 </div>
                              )
                           })}
                        </div>
                        : <div className="info-message">
                           <img className="info-ico" src={noImageIcon} alt="" />
                           <div className="info-text">
                              <label className="en">Sorry ! We have no photos.</label>
                              <label className="mr">क्षमस्व ! छायाचित्रे नाहीत.</label>
                              <label className="hn">क्षमस्व ! कोई छायाचित्र नहीं।</label>
                           </div>
                        </div>
                     }
                  </div>
               </div>


               <div className={`gallery-sec ${videos ? '' : 'not-configured'}`}>
                  <div className="title">
                     <label className="en">Videos</label>
                     <label className="mr">व्हिडीओ</label>
                     <label className="hn">विडिओ</label>
                  </div>
                  <div className="desc">
                     <label className="en">Few videos about business</label>
                     <label className="mr">व्यवसायाबद्दलच्या मोजक्या व्हिडीओ</label>
                     <label className="hn">कुछ व्यावसायिक विडिओ</label>
                  </div>
                  <div className="videos-area">
                     {videos ?
                        <div className="videos-list">

                           {videos.map((element, index) => {
                              return (
                                 <a href={element.url} className="video-item" key={index} target='_blank'>
                                    <span className="ico"><i className="fa-light fa-video"></i></span>
                                    <span className="name">{element.title}</span>
                                 </a>
                              )
                           })}
                        </div>
                        : <div className="info-message">
                           <img className="info-ico" src={noVideoIcon} alt="" />
                           <div className="info-text">
                              <label className="en">Sorry ! We have no videos.</label>
                              <label className="mr">क्षमस्व ! व्हिडीओ नाहीत.</label>
                              <label className="hn">क्षमस्व ! कोई विडिओ नहीं।</label>
                           </div>
                        </div>
                     }

                  </div>
               </div>

            </div>
         </div>

         {clickedImg && (
            <GalleryModal
               clickedImg={clickedImg}
               handelRotationRight={handelRotationRight}
               setClickedImg={setClickedImg}
               handelRotationLeft={handelRotationLeft}
            />
         )}
      </>
   )
}

export default Gallery;