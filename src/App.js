import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState, useRef, useEffect } from 'react';

import { useGlobalContext } from './context';
import './App.scss';

import Home from './components/home/Home';
import About from './components/about/About';
import Gallery from './components/gallery/Gallery';
import PayUs from './components/payus/PayUs';
import Tabs from './components/tabs/Tabs';
import VisitModal from './components/modals/VisitModal';
import ForwardModal from './components/modals/ForwardModal';
import ShareModal from './components/modals/ShareModal';
import CallModal from './components/modals/CallModal';
import EmailModal from './components/modals/EmailModal';
import ChatModal from './components/modals/ChatModal';
import SmsModal from './components/modals/SmsModal';
import UpiPaymentModal from './components/modals/UpiPaymentModal';


function App() {

  const { UserData, Loading, Error } = useGlobalContext();


  let [modalOpen, setModalOpen] = useState({
    VisitModal: false,
    ForwardModal: false,
    ShareModal: false,
    CallModal: false,
    EmailModal: false,
    ChatModal: false,
    SmsModal: false,
    UpiPaymentModal: false,
  });


  const [Copied, setCopied] = useState(false);
  const [Position, setPosition] = useState({ left: 'initial', top: 'initial' });

  const tabs = useRef("");
  const tooltip = useRef("");


  const handleCopyClipboard = (e, data) => {
    navigator.clipboard.writeText(data);
    setCopied(true);
    setTimeout(() => {
      let left = e.pageX - (tooltip.current.clientWidth / 2);
      let top = e.pageY - (tooltip.current.clientHeight + 14);
      setPosition({ left: left, top: top });
    }, 300)
    setTimeout(() => {
      setCopied(false);
      setPosition({ left: 'initial', top: 'initial' })
    }, 1500)
  }

  function ColorLuminance(hex, lum) {
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i * 2, 2), 16);
      c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
      rgb += ("00" + c).substring(c.length);
    }
    return rgb;
  }


  return (
    <>
      {Error != null ? <h2 className="data-error">{UserData.error}</h2> : ''}
      {Loading && <div className="loader"></div>}
      {UserData != null && <div className="wrapper" data-lang={UserData.config.language} style={{ "--primary": UserData.config.theme.primaryColor, "--primary-dark": ColorLuminance(UserData.config.theme.primaryColor, -0.10), "--title-color": UserData.config.theme.titleColor }}>
        <div className="inner-body">
          <BrowserRouter>
            <Routes>
              <Route path={`/`} element={<Tabs refElement={{ tabs }} />}>
                <Route index path={`home`} element={<Home modal={setModalOpen} refElement={tabs} />} />
                <Route path={`about`} element={<About modal={setModalOpen} handleCopyClipboard={handleCopyClipboard} />} />
                <Route path={`gallery`} element={<Gallery modal={setModalOpen} />} />
                <Route path={`payus`} element={<PayUs modal={setModalOpen} handleCopyClipboard={handleCopyClipboard} />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
        {modalOpen.VisitModal && <VisitModal modal={setModalOpen} />}
        {modalOpen.ForwardModal && <ForwardModal modal={setModalOpen} />}
        {modalOpen.ShareModal && <ShareModal modal={setModalOpen} />}
        {modalOpen.CallModal && <CallModal modal={setModalOpen} />}
        {modalOpen.EmailModal && <EmailModal modal={setModalOpen} />}
        {modalOpen.ChatModal && <ChatModal modal={setModalOpen} />}
        {modalOpen.SmsModal && <SmsModal modal={setModalOpen} />}
        {modalOpen.UpiPaymentModal && <UpiPaymentModal modal={setModalOpen} />}
        {Copied && <span className="tooltip-text" ref={tooltip} style={Position}>Copied</span>}
      </div>
      }

    </>
  );
}


export default App;