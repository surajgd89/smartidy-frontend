
import { useGlobalContext } from '../../context';
import './Modal.scss';
function VisitModal({ setModalOpen }) {
   const { UserData } = useGlobalContext();
   return (
      <div className="modal-backdrop">
         <div className="modal">
            <a href="#" className='close-modal' onClick={(e) => { e.preventDefault(); setModalOpen({ 'VisitModal': false }) }} ><i className='fa-light fa-times'></i></a>
            <div className="modal-header">
               <div className="ico"><i className="fa-light fa-external-link-square"></i></div>
               <div className="title">
                  <label className="en">Links</label>
                  <label className="mr">लिंक्स</label>
                  <label className="hn">लिंक्स</label>
               </div>
            </div>
            <div className="modal-body">
               <div className="item-list">
                  {UserData.business.links.map((element, index) => {
                     return (
                        <a href={element.url} className="item-row" key={index} target="_blank">
                           <span className="lbl">
                              <label>{element.title}</label>
                           </span>
                           <span className="val">{element.url}</span>
                        </a>
                     )
                  })
                  }
               </div>
            </div>
         </div>
      </div>
   );
}
export default VisitModal;