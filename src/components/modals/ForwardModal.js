
import { useEffect, useState } from 'react';

import './Modal.scss';
import { useSelector } from 'react-redux';
function ForwardModal({ setModalOpen }) {
   const userData = useSelector(state => state.idyUser.data);

   const [values, setValues] = useState({ mobile: '' });
   const [errors, setErrors] = useState({});
   const [flag, setFlag] = useState(false);


   const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
      setFlag(true)
   }

   const handleValidation = (e) => {
      e.preventDefault();
      setErrors(Validation(values));
      if (errors.valid) {
         console.log('done')
         window.open("https://wa.me/91" + values.mobile + "/?text=" + userData.config.smartIdyURL, "_blank");
      }
   }

   function Validation(values) {
      const errors = {};
      errors.valid = true;
      var pattern = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i);

      if (values.mobile === "") {
         errors.valid = false;
         errors.mobile = "This field is required.";
      } else if (!pattern.test(values.mobile)) {
         errors.valid = false;
         errors.mobile = "Please enter valid mobile number.";
      } else if (values.mobile.length != 10) {
         errors.valid = false;
         errors.mobile = "Please enter 10 digit mobile number.";
      }
      return errors
   }

   useEffect(() => {
      if (flag) {
         setErrors(Validation(values));
      }
   }, [values])

   return (
      <div className="modal-backdrop">
         <div className="modal">
            <a className='close-modal' onClick={() => { setModalOpen({ 'ForwardModal': false }) }}><i className='fa-light fa-times'></i></a>
            <div className="modal-header">
               <div className="ico"><i className="fa-light fa-share"></i></div>
               <div className="title">
                  <label className="en">Forward</label>
                  <label className="mr">फॉरवर्ड</label>
                  <label className="hn">फॉरवर्ड</label>
               </div>
            </div>
            <div className="modal-body">
               <div className="app-name">
                  <div className="ico">
                     <i className="fab fa-whatsapp"></i>
                     <span className="ico-lbl">WhatsApp</span>
                  </div>
               </div>
               <div className="share-form">
                  <form >
                     <div className="control-group">
                        <input type="number" name="mobile" value={values.mobile} onChange={handleChange} placeholder="Enter Mobile Number" onWheel={(e) => { e.target.blur() }}
                        />
                        {errors.mobile && <label className='error'>{errors.mobile}</label>}
                     </div>
                     <div className="action-sec">
                        <button className="act-btn" onClick={handleValidation} disabled={!errors.valid}>
                           <label className="en">Share on WhatsApp</label>
                           <label className="mr">WhatsApp वर पाठवा</label>
                           <label className="hn">WhatsApp पर भेजें</label>
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
}
export default ForwardModal;