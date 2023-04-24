
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context';
import './Modal.scss';
import Validation from './Validation';
function UpiPaymentModal({ setModalOpen }) {

   const { UserData } = useGlobalContext();
   const upiId = UserData.business.upiId;

   const [values, setvalues] = useState({
      amount: '',
      description: ''
   });

   const { amount, description } = values;

   const [errors, setErrors] = useState()

   const handleInput = (e) => {
      const newObj = { ...values, [e.target.name]: e.target.value }
      setInputs(newObj)
   }

   const handleValidation = (e) => {
      e.preventDefault();
      setErrors(Validation(values));
   }

   // https://www.youtube.com/watch?v=U4w3kvYePFs

   // const [IsValidAmount, setIsValidAmount] = useState(false);
   // const [IsValidDescription, setIsValidDescription] = useState(false);

   // const [AmountError, setAmountError] = useState('');
   // const [DescriptionError, setDescriptionError] = useState('');


   // if (amount === undefined && description === undefined) {
   //    setIsValidAmount(false)
   //    setIsValidDescription(false)
   //    setAmountError("This field is required.");
   //    setDescriptionError("This field is required.");
   // }

   // console.log(FormValidate())

   // if (FormValidate()) {
   //    var paymentStr = "https://tez.google.com/pay?pa=" + upiId + "&tn=" + description + "&am=" + amount + "&cu=INR";
   //    window.open(encodeURI(paymentStr), "_blank");
   // }



   // const FormValidate = () => {
   //    if (amount != undefined && description != undefined) {
   //       var pattern = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i);
   //       if (!pattern.test(amount)) {
   //          setIsValidAmount(false)
   //          setAmountError("Please enter number only");
   //       } else if (amount.length > 5) {
   //          setIsValidAmount(false)
   //          setAmountError("Please enter only 4 digit amount.");
   //       } else {
   //          setIsValidAmount(true)
   //          setAmountError("");
   //       }

   //       if (description.length > 40) {
   //          setIsValidDescription(false)
   //          setDescriptionError("Please enter only 40 charactors.");
   //       } else {
   //          setIsValidDescription(true)
   //          setDescriptionError("");
   //       }
   //       return (IsValidAmount === IsValidDescription);
   //    } else {
   //       return false;
   //    }
   // }

   // useEffect(() => {
   //    FormValidate()
   // }, [inputs])

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
                  <form>
                     <div className="control-group">
                        <input type="text" name="amount" onChange={handleInput} value={amount} placeholder="Enter Amount" required />
                        {err ? '' : <label className='error'>{AmountError}</label>}
                     </div>
                     <div className="control-group">
                        <textarea type="text" name="description" onChange={handleInput} value={description} placeholder="Enter Description"
                           required ></textarea>
                        {IsValidDescription ? '' : <label className='error'>{DescriptionError}</label>}
                     </div>
                     <div className="action-sec">
                        <a href="#" className="act-btn" onClick={handleValidation}>
                           <label className="en">Pay</label>
                           <label className="mr">देय द्या</label>
                           <label className="hn">भुगतान करें</label>
                           &nbsp;&nbsp;<i className="fa-light fa-indian-rupee-sign"></i>&nbsp;&nbsp;
                           <span>{amount}</span>
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