import './GalleryModal.scss'
function GalleryModal({ clickedImg, setClickedImg, handelRotationRight, handelRotationLeft }) {
   const handleClick = (e) => {
      if (e.target.classList.contains("dismiss")) {
         setClickedImg(null);
      }
   };
   return (
      <>
         <div className="gallery-modal dismiss" onClick={handleClick}>
            <img className="gallery-big-img" src={clickedImg} alt="biggerpic" />
            <i className="fa-light fa-times-circle close dismiss" onClick={handleClick} ></i>
            <div onClick={handelRotationLeft} className="arrow arrows-left">
               <i className="fa-light fa-angle-left"></i>
            </div>
            <div onClick={handelRotationRight} className="arrow arrows-right">
               <i className="fa-light fa-angle-right"></i>
            </div>
         </div>
      </>
   );
};

export default GalleryModal;