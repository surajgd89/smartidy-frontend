import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState, useRef, useEffect } from 'react';

import { useGlobalContext } from './context';
import './App.scss';

import Home from './components/home/Home';
import About from './components/about/About';
import Gallery from './components/gallery/Gallery';
import PayUs from './components/payus/PayUs';
import Tabs from './layout/tabs/Tabs';
import VisitModal from './layout/modals/VisitModal';
import ForwardModal from './layout/modals/ForwardModal';
import ShareModal from './layout/modals/ShareModal';
import CallModal from './layout/modals/CallModal';
import EmailModal from './layout/modals/EmailModal';
import ChatModal from './layout/modals/ChatModal';
import SmsModal from './layout/modals/SmsModal';
import UpiPaymentModal from './layout/modals/UpiPaymentModal';


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

  const profile = useRef();
  const tabs = useRef();
  const social = useRef();
  const tooltip = useRef();

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

  return (
    <>
      {Error != null ? <h2 className="data-error">{UserData.error}</h2> : ''}
      {Loading && <div className="loader"></div>}
      {UserData != null && <div className="wrapper" data-lang={UserData.config.language} style={{ "--primary": UserData.config.theme.primaryColor, "--primary-dark": UserData.config.theme.primaryDarkColor, "--title-color": UserData.config.theme.titleColor }}>
        <div className="inner-body">
          <BrowserRouter>
            <Routes>
              <Route path={`/`} element={<Tabs refElement={{ tabs }} />}>
                <Route index path={`home`} element={<Home modal={setModalOpen} refElement={{ profile, social, tabs }} />} />
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