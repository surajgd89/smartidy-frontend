import { useEffect } from "react";
import { useGlobalContext } from '../../context';
import './Modal.scss';
function ForwardModal(props) {
   let setModalOpen = props.modal;
   const { UserData } = useGlobalContext();
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
                  <form id="shareForm">
                     <div className="control-group">
                        <input type="number" id="WhatsAppVal" name="WhatsAppVal" placeholder="Enter WhatsApp Number"
                           required />
                     </div>
                     <div className="action-sec">
                        <a href="#" id="WhatsAppBtn" className="act-btn">
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