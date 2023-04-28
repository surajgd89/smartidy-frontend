
import { WhatsappShareButton, TelegramShareButton, TwitterShareButton, EmailShareButton, FacebookShareButton, LinkedinShareButton, } from "react-share";
import { useGlobalContext } from '../../context';
import QRCode from "react-qr-code";
import './Modal.scss';
function ShareModal({ setModalOpen }) {

   const { userData } = useGlobalContext();
   const shareData = {
      url: userData.config.smartIdyUrl,
      title: null,
      quote: null,
      summary: null,
      source: null,
      hashtag: null,
      subject: null,
      body: null
   }
   return (
      <div className="modal-backdrop">
         <div className="modal">
            <a className='close-modal' onClick={() => { setModalOpen({ 'ShareModal': false }) }}><i className='fa-light fa-times'></i></a>
            <div className="modal-header">
               <div className="ico"><i className="fa-light fa-share-alt"></i></div>
               <div className="title">
                  <label className="en">Share</label>
                  <label className="mr">शेअर</label>
                  <label className="hn">शेअर</label>
               </div>
            </div>
            <div className="modal-body">
               <div className="qr-sec">
                  <div className="qr-frame">
                     <QRCode value={shareData.url} size={160} className="qrcode" fgColor={`${userData.config.theme.primaryColor}`} viewBox={`0 0 160 160`} />
                  </div>
               </div>
               <div className="share-via">
                  <WhatsappShareButton url={shareData.url} resetButtonStyle={false} className="share-opt whatsapp">
                     <i className="fab fa-whatsapp"></i><span>WhatsApp</span>
                  </WhatsappShareButton>
                  <FacebookShareButton url={shareData.url} resetButtonStyle={false} className="share-opt facebook" quote={shareData.quote} hashtag={shareData.hashtag}>
                     <i className="fab fa-facebook"></i><span>Facebook</span>
                  </FacebookShareButton>
                  <LinkedinShareButton url={shareData.url} resetButtonStyle={false} className="share-opt linkedin" title={shareData.title} summary={shareData.summary} source={shareData.source}>
                     <i className="fab fa-linkedin"></i><span>LinkedIn</span>
                  </LinkedinShareButton>
                  <TwitterShareButton url={shareData.url} resetButtonStyle={false} className="share-opt twitter" title={shareData.title} hashtag={shareData.hashtag}>
                     <i className="fab fa-twitter"></i><span>Twitter</span>
                  </TwitterShareButton>
                  <TelegramShareButton url={shareData.url} resetButtonStyle={false} className="share-opt telegram" title={shareData.title}>
                     <i className="fab fa-telegram"></i><span>Telegram</span>
                  </TelegramShareButton>
                  <EmailShareButton url={shareData.url} resetButtonStyle={false} className="share-opt email" subject={shareData.subject} body={shareData.body}>
                     <i className="fa fa-envelope"></i><span>Email</span>
                  </EmailShareButton>
               </div>
            </div>
         </div>
      </div >

   );
}
export default ShareModal;