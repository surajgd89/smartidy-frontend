

import './Modal.scss';
function EmailModal({ setModalOpen }) {


   return (
      <div className="modal-backdrop">
         <div className="modal">
            <a className='close-modal' onClick={() => { setModalOpen({ 'EmailModal': false }) }}><i className='fa-light fa-times'></i></a>
            <div className="modal-header">
               <div className="ico"><i className="fa-light fa-envelope"></i></div>
               <div className="title">
                  <label className="en">Email</label>
                  <label className="mr">ई-मेल</label>
                  <label className="hn">ई-मेल</label>
               </div>
            </div>
            <div className="modal-body">
               <div className="item-list emails">
                  <a href={`mailto:${userData.individual.email}`} className="item-row add-vcard ">
                     <span className="lbl">
                        <label className="en">Individual</label>
                        <label className="mr">वैयक्तिक</label>
                        <label className="hn">व्यक्तिगत</label>
                     </span>
                     <span className="val">{userData.individual.email}</span>
                  </a>
                  <a href={`mailto:${userData.business.email}`} className="item-row">
                     <span className="lbl">
                        <label className="en">Business</label>
                        <label className="mr">व्यवसाय</label>
                        <label className="hn">व्यवसाय</label>
                     </span>
                     <span className="val">{userData.business.email}</span>
                  </a>
               </div>
            </div>
         </div>
      </div>
   );
}
export default EmailModal;