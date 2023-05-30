

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

import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './features/user/userSlice';

function App() {
  const dispatch = useDispatch();
  const userId = new URLSearchParams(window.location.search).get('userId');


  const userData = useSelector(state => state.idyUser);
  const { data, loading, error } = userData;
  const { config } = { ...data };
  const { language, theme } = { ...config };
  const { primaryColor, titleColor } = { ...theme };

  const themeStyle = {
    "--primary": primaryColor,
    "--primary-dark": ColorLuminance(primaryColor, -0.10),
    "--title-color": titleColor
  }

  const [copied, setCopied] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState({ left: 'initial', top: 'initial' });
  const tabsRef = useRef("");
  const tooltipRef = useRef("");

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

  const handleCopyClipboard = (e, data) => {
    navigator.clipboard.writeText(data);
    setCopied(true);
    setTimeout(() => {
      let left = e.pageX - (tooltipRef.current.clientWidth / 2);
      let top = e.pageY - (tooltipRef.current.clientHeight + 14);
      setTooltipStyle({ left: left, top: top });
    }, 300)
    setTimeout(() => {
      setCopied(false);
      setTooltipStyle({ left: 'initial', top: 'initial' })
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

  useEffect(() => {
    dispatch(fetchUser(userId))
  }, [dispatch]);


  if (loading) {
    return <div className="loader"></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {data &&
        <div className="wrapper" data-lang={language} style={themeStyle}>

          <div className="inner-body">
            <BrowserRouter>
              <Routes>
                <Route path={`/`} element={<Tabs tabsRef={tabsRef} />}>
                  <Route index path={`home`} element={<Home setModalOpen={setModalOpen} tabsRef={tabsRef} />} />
                  <Route path={`about`} element={<About setModalOpen={setModalOpen} handleCopyClipboard={handleCopyClipboard} />} />
                  <Route path={`gallery`} element={<Gallery setModalOpen={setModalOpen} />} />
                  <Route path={`payus`} element={<PayUs setModalOpen={setModalOpen} handleCopyClipboard={handleCopyClipboard} />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </div>
          {modalOpen.VisitModal && <VisitModal setModalOpen={setModalOpen} />}
          {modalOpen.ForwardModal && <ForwardModal setModalOpen={setModalOpen} />}
          {modalOpen.ShareModal && <ShareModal setModalOpen={setModalOpen} />}
          {modalOpen.CallModal && <CallModal setModalOpen={setModalOpen} />}
          {modalOpen.EmailModal && <EmailModal setModalOpen={setModalOpen} />}
          {modalOpen.ChatModal && <ChatModal setModalOpen={setModalOpen} />}
          {modalOpen.SmsModal && <SmsModal setModalOpen={setModalOpen} />}
          {modalOpen.UpiPaymentModal && <UpiPaymentModal setModalOpen={setModalOpen} />}
          {copied && <span className="tooltip-text" ref={tooltipRef} style={tooltipStyle}>Copied</span>}
        </div>
      }
    </>

  )

}


export default App;