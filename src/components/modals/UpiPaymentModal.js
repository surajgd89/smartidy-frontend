
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context';
import './Modal.scss';
function UpiPaymentModal({ setModalOpen }) {

   const { userData } = useGlobalContext();
   const upiAddress = userData.business.upiId;

   const [values, setValues] = useState({ amount: '0', description: '' });
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
         const paymentString = "tez://upi/pay?pa=" + upiAddress + "&tn=" + values.description + "&am=" + values.amount + "&cu=INR";
         window.open(encodeURI(paymentString), "_blank");
      }
   }

   function Validation(values) {
      const errors = {};
      errors.valid = true;

      if (values.amount === "" || values.amount === '0') {
         errors.valid = false;
         errors.amount = "Please enter valid amount.";
      } else if (values.amount.length > 5) {
         errors.valid = false;
         errors.amount = "Please don't enter amount more than 1 Lakh.";
      }


      if (values.description === '') {
         errors.valid = false;
         errors.description = "Please enter Description.";
      } else if (values.description.length > 40) {
         errors.valid = false;
         errors.description = "Please enter maximum 40 charactors";
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
                        <input type="number" name="amount" value={values.amount} onChange={handleChange} onWheel={(e) => { e.target.blur() }} placeholder="Enter Amount" />
                        {errors.amount && <label className='error'>{errors.amount}</label>}
                     </div>
                     <div className="control-group">
                        <textarea type="text" name="description" value={values.description} onChange={handleChange} placeholder="Enter Description"
                        ></textarea>
                        {errors.description && <label className='error'>{errors.description}</label>}
                     </div>
                     <div className="action-sec">
                        <button className="act-btn" onClick={handleValidation} disabled={!errors.valid}>
                           <label className="en">Pay</label>
                           <label className="mr">देय द्या</label>
                           <label className="hn">भुगतान करें</label>
                           &nbsp;&nbsp;<i className="fa-light fa-indian-rupee-sign"></i>&nbsp;&nbsp;
                           <span>{values.amount}</span>
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div >
      </div >
   );
}
export default UpiPaymentModal;