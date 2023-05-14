import { useState, useEffect } from "react";
import moment from 'moment/moment';
import { useSelector } from 'react-redux';

import './About.scss';

function About({ setModalOpen, handleCopyClipboard }) {

   const userData = useSelector(state => state.idyUser.data);



   const [day, setDay] = useState('');

   useEffect(() => {
      setDay(moment().isoWeekday())
   }, [])

   return (
      <div className="page about" >
         <div className='header'>
            <div className="title">
               <label className="en">About Us</label>
               <label className="mr">माहिती</label>
               <label className="hn">जानकारी</label>
            </div>
            <div className="action">
               <a href="#" onClick={(e) => { e.preventDefault(); setModalOpen({ 'ShareModal': true }) }} className="share-all">
                  <i className="fa-light fa-share-alt"></i>
               </a>
            </div>
         </div>
         <div className="content">
            <div className="data-row">
               <div className="title">
                  <i className="fa-light fa-building"></i>
                  <div className="lbl" >
                     <label className="en">Business Name</label>
                     <label className="mr">व्यवसायाचे नाव</label>
                     <label className="hn">व्यवसाय का नाम</label>
                  </div>
               </div>
               <div className="data">
                  <div className="val business-name">{userData.business.name}</div>
               </div>
            </div>
            <div className="data-row">
               <div className="title">
                  <i className="fa-light fa-user-tie"></i>
                  <div className="lbl" >
                     <label className="en">Designation</label>
                     <label className="mr">पद</label>
                     <label className="hn">पद</label>
                  </div>
               </div>
               <div className="data">
                  <div className="val">{userData.business.designation}</div>
               </div>
            </div>
            <div className="data-row">
               <div className="title">
                  <i className="fa-light fa-briefcase"></i>
                  <div className="lbl">
                     <label className="en">About Business</label>
                     <label className="mr">व्यवसायाबद्दल</label>
                     <label className="hn">व्यवसाय के बारे में</label>
                  </div>
               </div>
               <div className="data">
                  <div className="val">
                     {userData.business.about.map((element, index) => {
                        return (<p key={index}>{element}</p>)
                     })}
                  </div>
               </div>
            </div>

            {userData.business.services &&
               <div className="data-row">
                  <div className="title">
                     <i className="fa-light fa-paper-plane"></i>
                     <div className="lbl">
                        <label className="en">Services</label>
                        <label className="mr">सेवा</label>
                        <label className="hn">सेवाएँ</label>
                     </div>
                  </div>
                  <div className="data">
                     <div className="val">
                        <ul className="service-list">
                           {userData.business.services.map((element, index) => {
                              return (<li key={index}>{element}</li>)
                           })}
                        </ul>
                     </div>
                  </div>
               </div>
            }
            {userData.business.eFiles &&
               <div className="data-row">
                  <div className="title">
                     <i className="fa-light fa-file-download"></i>
                     <div className="lbl">
                        <label className="en">E-Files</label>
                        <label className="mr">इ-फाईल</label>
                        <label className="hn">इ-फाईल</label>
                     </div>
                  </div>
                  <div className="data">
                     <div className="val">
                        <div className="efiles-sec">
                           {userData.business.eFiles.map((element, index) => {
                              return (
                                 <a href={element.src} className="e-file" key={index} download>
                                    <span className="file-ico"><i className={`fa-light ${element.type === "pdf" && 'fa-file-pdf'} ${element.type === "doc" && 'fa-file-word'} ${element.type === "xls" && 'fa-file-excel'} ${element.type === "ppt" && 'fa-file-powerpoint'}`}></i></span>
                                    <span className="file-name">{element.title}</span>
                                    <span className="file-act-ico"><i className="fad fa-download"></i></span>
                                 </a>
                              )
                           })}
                        </div>
                     </div>
                  </div>
               </div>
            }
            <div className="data-row">
               <div className="title">
                  <i className="fa-light fa-map-marked-alt"></i>

                  <div className="lbl">
                     <label className="en">Address</label>
                     <label className="mr">पत्ता</label>
                     <label className="hn">पता</label>
                  </div>

               </div>
               <div className="data">
                  <div className="val">
                     <span>{userData.business.address}</span>
                     <i className="fa-light fa-clone copy-to-clipboard" onClick={(e) => { handleCopyClipboard(e, userData.business.address) }}></i>
                  </div>
               </div>
            </div>
            {userData.business.gstin &&
               <div className="data-row">
                  <div className="title">
                     <i className="fa-light fa-file-certificate"></i>
                     <div className="lbl">GSTIN</div>
                  </div>
                  <div className="data">
                     <div className="val">
                        <span>{userData.business.gstin}</span>
                        <i className="fa-light fa-clone copy-to-clipboard" onClick={(e) => { handleCopyClipboard(e, userData.business.gstin) }}>

                        </i>
                     </div>
                  </div>
               </div>
            }
            {userData.business.msme &&
               <div className="data-row">
                  <div className="title">
                     <i className="fa-light fa-file-certificate"></i>
                     <div className="lbl">MSME</div>
                  </div>
                  <div className="data">
                     <div className="val"><span>{userData.business.msme}</span>
                        <i className="fa-light fa-clone copy-to-clipboard" onClick={(e) => { handleCopyClipboard(e, userData.business.msme) }}>

                        </i>
                     </div>
                  </div>
               </div>
            }

            {userData.business.fssai &&
               <div className="data-row">
                  <div className="title">
                     <i className="fa-light fa-file-certificate"></i>
                     <div className="lbl">FSSAI</div>
                  </div>
                  <div className="data">
                     <div className="val"><span>{userData.business.fssai}</span> <i
                        className="fa-light fa-clone copy-to-clipboard" onClick={(e) => { handleCopyClipboard(e, userData.business.fssai) }}></i>
                     </div>
                  </div>
               </div>
            }

            <div className="data-row">
               <div className="title">
                  <i className="fa-light fa-envelope"></i>

                  <div className="lbl">
                     <label className="en">Email</label>
                     <label className="mr">ई-मेल</label>
                     <label className="hn">ई-मेल</label>
                  </div>

               </div>
               <div className="data">
                  <div className="val"><a href={`mailto:${userData.business.email}`}
                     className="link">{userData.business.email}</a><i className="fa-light fa-clone copy-to-clipboard" onClick={(e) => { handleCopyClipboard(e, userData.business.email) }}></i>
                  </div>
               </div>
            </div>
            <div className="data-row">
               <div className="title">
                  <i className="fa-light fa-phone"></i>
                  <div className="lbl">
                     <label className="en">Call</label>
                     <label className="mr">कॉल</label>
                     <label className="hn">कॉल</label>
                  </div>
               </div>
               <div className="data">


                  <div className="val"><span>{userData.business.call}</span><i
                     className="fa-light fa-clone copy-to-clipboard" onClick={(e) => { handleCopyClipboard(e, userData.business.call) }}
                  ></i>
                  </div>
               </div>
            </div>
            <div className="data-row">
               <div className="title">
                  <i className="fa-light fa-globe"></i>
                  <div className="lbl">
                     <label className="en">Website</label>
                     <label className="mr">संकेतस्थळ</label>
                     <label className="hn">वेबसाइट</label>
                  </div>
               </div>
               <div className="data">
                  <div className="val"><a href={userData.business.website}
                     className="link">{userData.business.website}</a><i
                        className="fa-light fa-clone copy-to-clipboard" onClick={(e) => { handleCopyClipboard(e, userData.business.website) }}></i>
                  </div>
               </div>
            </div>
            <div className="data-row">
               <div className="title">
                  <i className="fa-light fa-link"></i>
                  <div className="lbl">SmartIDy URL</div>
               </div>
               <div className="data">
                  <div className="val">
                     <a href={userData.config.smartIdyUrl} className="link smartidy-url">{userData.config.smartIdyUrl}</a>
                     <i className="fa-light fa-clone copy-to-clipboard" onClick={(e) => { handleCopyClipboard(e, userData.config.smartIdyUrl) }}></i>
                  </div>
               </div>
            </div>
            <div className="data-row">
               <div className="title">
                  <i className="fa-light fa-clock"></i>
                  <div className="lbl">
                     <label className="en">Business Hours</label>
                     <label className="mr">व्यवसायाची वेळ</label>
                     <label className="hn">व्यवसाय का समय</label>
                  </div>
               </div>

               {userData.business.workingDayHrs &&
                  <div className="data">
                     <div className="val">
                        <ul className="buss-hrs-sec">
                           {userData.business.workingDayHrs.map((element, index) => {
                              index = index + 1;
                              return (
                                 <li className={index == day ? 'active' : ''} key={index}>
                                    <div className="day">
                                       <label>{element.day}</label>
                                    </div>
                                    {element.working ?
                                       <div className="time">
                                          <span>{element.openAt}</span>
                                          <span>{element.closesAt}</span>
                                       </div> : <div className="time">
                                          <span>Closed</span>
                                       </div>
                                    }
                                 </li>
                              )
                           })}
                        </ul>
                     </div>
                  </div>
               }
            </div>
         </div>
      </div>
   )
}
export default About;