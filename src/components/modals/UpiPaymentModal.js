
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context';
import './Modal.scss';
function UpiPaymentModal({ setModalOpen }) {

   const { UserData } = useGlobalContext();
   const upiId = UserData.business.upiId;

   const [values, setValues] = useState({ amount: '', description: '' });
   const [errors, setErrors] = useState({})

   const handleInput = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value })
   }

   const handleValidation = (e) => {
      e.preventDefault();
      setErrors(Validation(values));
      console.log(errors)
   }

   function Validation(values) {
      const errors = {};

      var pattern = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i);

      if (values.amount === '') {
         errors.amount = "Amount is Required";
      } else if (!pattern.test(values.amount)) {
         errors.amount = "Please enter number only";
      }

      if (values.amount.length > 5) {
         errors.amount = "Please enter only 4 digit amount.";
      }

      if (values.description === '') {
         errors.description = "Description is Required";
      }

      return errors
   }




   return (
      <div className="modal-backdrop">
         <div className="modal">
            <a className='close-modal' onClick={() => { setModalOpen({ 'UpiPaymentModal': false }) }}><i className='fa-light fa-times'></i></a>
            <div className="modal-header">
               <div className="ico"><i className="fa-light fa-wallet"></i></div>
               <div className="title">
                  <label className="en">Pay with UPI</label>
                  <label className="mr">UPI द्वारा व्यवहार करा</label>
                  <label className="hn">UPI के माध्यम से पैसे भेजें</label>
               </div>
            </div>
            <div className="modal-body">
               <div className="pay-form">
                  <form >
                     <div className="control-group">
                        <input type="text" name="amount" value={values.amount} onChange={handleInput} placeholder="Enter Amount" />
                        {errors.amount && <label className='error'>{errors.amount}</label>}
                     </div>
                     <div className="control-group">
                        <textarea type="text" name="description" value={values.description} onChange={handleInput} placeholder="Enter Description"
                        ></textarea>
                        {errors.description && <label className='error'>{errors.description}</label>}
                     </div>
                     <div className="action-sec">
                        <a href='#' className="act-btn" onClick={handleValidation}>
                           <label className="en">Pay</label>
                           <label className="mr">देय द्या</label>
                           <label className="hn">भुगतान करें</label>
                           &nbsp;&nbsp;<i className="fa-light fa-indian-rupee-sign"></i>&nbsp;&nbsp;
                           <span>{values.amount}</span>
                        </a>
                     </div>
                  </form>
               </div>
            </div>
         </div >
      </div >
   );
}
export default UpiPaymentModal;