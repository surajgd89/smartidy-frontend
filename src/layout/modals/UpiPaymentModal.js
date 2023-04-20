import { useEffect } from "react";
import { useGlobalContext } from '../../context';
import './Modal.scss';
function UpiPaymentModal(props) {
   let setModalOpen = props.modal;
   const { UserData } = useGlobalContext();
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
                  <form id="payForm">
                     <div className="control-group">
                        <input type="number" id="upiAmt" name="upiAmt" placeholder="Enter Amount" maxLength="5"
                           required />
                     </div>
                     <div className="control-group">
                        <input type="text" id="payDesc" name="payDesc" placeholder="Enter Description" maxLength="80"
                           required />
                     </div>
                     <div className="action-sec">
                        <a href="#" id="paylink" className="act-btn ">
                           <label className="en">Pay</label>
                           <label className="mr">देय द्या</label>
                           <label className="hn">भुगतान करें</label>
                           &nbsp;&nbsp;<i className="fa-light fa-indian-rupee-sign"></i>&nbsp;&nbsp;
                           <span id="upiAmount">0</span>
                        </a>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
}
export default UpiPaymentModal;