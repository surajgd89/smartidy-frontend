
import { useGlobalContext } from '../../context';
import './Modal.scss';
function SmsModal({ setModalOpen }) {

   const { userData } = useGlobalContext();
   return (
      <div className="modal-backdrop">
         <div className="modal">
            <a className='close-modal' onClick={() => { setModalOpen({ 'SmsModal': false }) }}><i className='fa-light fa-times'></i></a>
            <div className="modal-header">
               <div className="ico"><i className="fa-light fa-comment-alt-lines"></i></div>
               <div className="title">
                  <label className="en">SMS</label>
                  <label className="mr">मेसेज</label>
                  <label className="hn">मेसेज</label>
               </div>
            </div>
            <div className="modal-body">
               <div className="item-list">
                  <a href={`sms:${userData.individual.sms}`} className="item-row ">
                     <span className="lbl">
                        <label className="en">Individual</label>
                        <label className="mr">वैयक्तिक</label>
                        <label className="hn">व्यक्तिगत</label>
                     </span>
                     <span className="val">{userData.individual.sms}</span>
                  </a>
                  <a href={`sms:${userData.business.sms}`} className="item-row ">
                     <span className="lbl">
                        <label className="en">Business</label>
                        <label className="mr">व्यवसाय</label>
                        <label className="hn">व्यवसाय</label>
                     </span>
                     <span className="val">{userData.business.sms}</span>
                  </a>

               </div>
            </div>
         </div>
      </div>
   );
}
export default SmsModal;