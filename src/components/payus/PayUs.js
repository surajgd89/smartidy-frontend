import { useGlobalContext } from '../../context';
import './PayUs.scss';
import GpayLogo from "../../assets/images/g-pay.png";
import PhonePayLogo from "../../assets/images/p-pay.png";
import PayTmLogo from "../../assets/images/paytm.png";
import BhimLogo from "../../assets/images/bhim.png";
import PGLogoDefault from '../../assets/images/pg-logo-default.jpg'

function PayUs({ setModalOpen, handleCopyClipboard }) {

   const { userData } = useGlobalContext();
   const accountDetails = () => {
      const name = userData.business.bankAccount.name;
      const bank = userData.business.bankAccount.bank;
      const number = userData.business.bankAccount.number;
      const ifsc = userData.business.bankAccount.ifsc;
      const type = userData.business.bankAccount.type;
      const branch = userData.business.bankAccount.branch;
      return `Name:${name},\nBank Name: ${bank},\nAccount No : ${number},\nIFSC Code: ${ifsc},\nAccount Type : ${type},\<n></n>Branch : ${branch}`
   }
   return (
      <div className="page payus">
         <div className="header">
            <div className="title">
               <label className="en">Pay Us</label>
               <label className="mr">व्यवहार</label>
               <label className="hn">व्यवहार</label>
            </div>
            <div className="action">
               <a href="#" onClick={(e) => { e.preventDefault(); setModalOpen({ 'ShareModal': true }) }} className="share-all">
                  <i className="fa-light fa-share-alt"></i>
               </a>
            </div>
         </div>
         <div className="content">

            {userData.business.upiId != null ?
               <div className="upi-sec">
                  <a onClick={() => { setModalOpen({ 'UpiPaymentModal': true }) }} className="upi-btn ">
                     <span>
                        <label className="en">Pay with UPI</label>
                        <label className="mr">UPI द्वारे पैसे पाठवा</label>
                        <label className="hn">UPI के माध्यम से पैसे भेजें</label>
                     </span>
                     <span>
                        <label className="en">UPI payment apps like Google Pay, Paytm, PhonePe, Bhim
                           etc.</label>
                        <label className="mr">फक्त UPI व्यवहारासाठी Google Pay, Paytm, PhonePe,
                           Bhim इत्यादी</label>
                        <label className="hn">केवल UPI देन के लिए Google Pay, Paytm, PhonePe, Bhim
                           आदि</label>
                     </span>
                     <div className="upi-logos">
                        <img src={GpayLogo} />
                        <img src={PhonePayLogo} />
                        <img src={PayTmLogo} />
                        <img src={BhimLogo} />
                     </div>
                  </a>
                  <div className="upi-id">
                     <span >{userData.business.upiId}</span>
                     <i className="fa-light fa-clone copy-to-clipboard" onClick={(e) => { handleCopyClipboard(e, userData.business.upiId) }}></i>
                  </div>
               </div> :
               <div className="not-configured">
                  <i className='fa-light fa-exclamation-triangle'></i>
                  UPI ID not configured
               </div>
            }

            {userData.business.paymentGateway.url != null ?
               <div className="pg-sec">
                  <a href={userData.business.paymentGateway.url} target="_blank" className="pg-btn ">
                     <span>
                        <label className="en">Make Payment</label>
                        <label className="mr">व्यवहार करा</label>
                        <label className="hn">व्यवहार कीजिए</label>
                     </span>
                     <span>
                        <label className="en">Make a payment using your Netbanking & UPI apps.</label>
                        <label className="mr"> UPI व Net Banking च्या व्यवहारासाठी </label>
                        <label className="hn"> UPI और Net Banking के व्यवहार के लिए </label>
                     </span>
                     <div className="pg-logos">
                        <img src={userData.business.paymentGateway.logo != null ? userData.business.paymentGateway.logo : PGLogoDefault} />
                     </div>
                  </a>
               </div> :
               <div className="not-configured">
                  <i className='fa-light fa-exclamation-triangle'></i>
                  Payment gateway link not configured
               </div>
            }

            {userData.business.bankAccount != null ?
               <div className="account-sec">
                  <div className="account-data">
                     <i className="fa-light fa-clone copy-to-clipboard copy" onClick={(e) => { handleCopyClipboard(e, accountDetails()) }}></i>
                     <div className="acc-row">
                        <div className="lbl">
                           <label className="en">Name</label>
                           <label className="mr">नाव</label>
                           <label className="hn">नाम</label>
                        </div>
                        <div className="val">{userData.business.bankAccount.name}</div>
                     </div>
                     <div className="acc-row">
                        <div className="lbl">
                           <label className="en">Bank Name</label>
                           <label className="mr">बँकेचे नाव</label>
                           <label className="hn">बैंक का नाम</label>
                        </div>
                        <div className="val">{userData.business.bankAccount.bank}</div>
                     </div>
                     <div className="acc-row">
                        <div className="lbl">
                           <label className="en">Account Number</label>
                           <label className="mr">खाते क्रमांक</label>
                           <label className="hn">खाता क्रमांक</label>
                        </div>
                        <div className="val"><span >{userData.business.bankAccount.number}</span><i className="fa-light fa-clone copy-to-clipboard" onClick={(e) => { handleCopyClipboard(e, userData.business.bankAccount.number) }}></i>
                        </div>
                     </div>
                     <div className="acc-row">
                        <div className="lbl">
                           <label className="en">IFSC Code</label>
                           <label className="mr">IFSC कोड</label>
                           <label className="hn">IFSC कोड</label>
                        </div>
                        <div className="val"><span id="ifscNo">{userData.business.bankAccount.ifsc}</span>
                           <i className="fa-light fa-clone copy-to-clipboard" onClick={(e) => { handleCopyClipboard(e, userData.business.bankAccount.ifsc) }}></i>
                        </div>
                     </div>
                     <div className="acc-row">
                        <div className="lbl">
                           <label className="en">Account Type</label>
                           <label className="mr">खाते प्रकार</label>
                           <label className="hn">खाते का प्रकार</label>
                        </div>
                        <div className="val">{userData.business.bankAccount.type}</div>
                     </div>
                     <div className="acc-row">
                        <div className="lbl">
                           <label className="en">Branch</label>
                           <label className="mr">शाखा</label>
                           <label className="hn">शाखा</label>
                        </div>
                        <div className="val">{userData.business.bankAccount.branch}</div>
                     </div>
                  </div>
               </div>
               :
               <div className="not-configured">
                  <i className='fa-light fa-exclamation-triangle'></i>
                  We have not any bank account details
               </div>
            }
         </div>
      </div >
   )
}
export default PayUs;