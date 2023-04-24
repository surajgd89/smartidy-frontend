
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context';
import './Modal.scss';
function ForwardModal({setModalOpen}) {

   const { UserData } = useGlobalContext();


   const [input, setInput] = useState();
   const [isValid, setisValid] = useState(false);
   const [error, setError] = useState('');

   const handleChange = (e) => {
      setInput(e.target.value)
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      if (input === undefined) {
         setisValid(false)
         setError("This field is required.");
      }
      if (isValid) {
         window.open("https://wa.me/91" + input + "/?text=" + UserData.config.smartIdyURL, "_blank");
      }
   };

   const FormValidate = () => {

      if (input != undefined) {
         var pattern = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i);
         if (!pattern.test(input)) {
            setisValid(false)
            setError("Please enter number only");
         } else if (input.length != 10) {
            setisValid(false)
            setError("Please enter 10 digit mobile number.");
         } else {
            setisValid(true)
            setError("");
         }
      }
      return isValid;
   }

   useEffect(() => {
      FormValidate();
   }, [input])

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
                        <input type="text" name="mobile" value={input} onChange={handleChange} placeholder="Enter Mobile Number"
                           required />
                        {isValid ? '' : <label className='error'>{error}</label>}
                     </div>
                     <div className="action-sec">
                        <a href="#" className="act-btn" onClick={handleSubmit}>
                           <label className="en">Share on WhatsApp</label>
                           <label className="mr">WhatsApp वर पाठवा</label>
                           <label className="hn">WhatsApp पर भेजें</label>
                        </a>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
}
export default ForwardModal;