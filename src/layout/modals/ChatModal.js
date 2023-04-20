import { useEffect } from "react";
import { useGlobalContext } from '../../context';
import './Modal.scss';

function ChatModal(props) {
   let setModalOpen = props.modal;
   const { UserData } = useGlobalContext();
   return (
      <div className="modal-backdrop">
         <div className="modal">
            <a className='close-modal' onClick={() => { setModalOpen({ 'ChatModal': false }) }}><i className='fa-light fa-times'></i></a>
            <div className="modal-header">
               <div className="ico"><i className="fa-light fa-comments-alt"></i></div>
               <div className="title">
                  <label className="en">Chat</label>
                  <label className="mr">संवाद</label>
                  <label className="hn">संवाद</label>
               </div>
            </div>
            <div className="modal-body">
               <div className="item-list">
                  {UserData.individual.chat.map((element, index) => {
                     return (
                        <a href={element.title == "WhatsApp" ? `https://wa.me/${element.value}` : `https://t.me/${element.value}`} className="item-row" key={index} target="_blank">
                           <span className="lbl">
                              <label className="en">Individual {element.title}</label>
                              <label className="mr">वैयक्तिक {element.title}</label>
                              <label className="hn">व्यक्तिगत {element.title}</label>
                           </span>
                           <span className="val">{element.value}</span>
                        </a>
                     )
                  })}
                  {UserData.business.chat.map((element, index) => {
                     return (
                        <a href={element.title == "WhatsApp" ? `https://wa.me/${element.value}` : `https://t.me/${element.value}`} className="item-row" key={index} target="_blank">
                           <span className="lbl">
                              <label className="en">Business {element.title}</label>
                              <label className="mr">व्यवसाय {element.title}</label>
                              <label className="hn">व्यवसाय {element.title}</label>
                           </span>
                           <span className="val">{element.value}</span>
                        </a>
                     )
                  })}
               </div>
            </div>
         </div>
      </div >

   );
}
export default ChatModal;