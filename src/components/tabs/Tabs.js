import { useRef, useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import './Tabs.scss';
import { useSelector } from 'react-redux';
function Tabs({ tabs }) {

    const userData = useSelector(state => state.idyUser.data);
    const { business } = userData;
    let { upiId, paymentGateway, bankAccount } = { ...business };


    const location = useLocation();
    const tabFloor = useRef();
    const { pathname, search } = location;
    const [dimensions, setDimensions] = useState({
        width: 0,
        left: 0,
    });
    const [Innerloading, setInnerloading] = useState(true);
    const InnerPageLoader = () => {
        setInnerloading(true);
        setTimeout(() => {
            setInnerloading(false);
        }, 1500);
    };
    const handleClick = (e) => {
        let getWidth = e.currentTarget.offsetWidth;
        let getLeft = e.currentTarget.offsetLeft;

        setDimensions({
            width: getWidth,
            left: getLeft,
        });
        InnerPageLoader();
    };
    useEffect(() => {
        let IsActive = document.querySelector('.tabs a.active');
        setTimeout(() => {
            setDimensions({
                width: IsActive.offsetWidth,
                left: IsActive.offsetLeft,
            });
        }, 1500)
        InnerPageLoader();
    }, []);

    return (
        <>
            {Innerloading ? <div className="page-loader"></div> : <Outlet />}
            <div ref={tabs}
                className={`tabs ${pathname === '/home' ? '' : 'primary-tabs'
                    }`}>
                <NavLink
                    to={`home${search}`}
                    onClick={(e) => {
                        handleClick(e);
                    }}>
                    <span>
                        <i className="fa-light fa-home-alt"></i>
                        <span>
                            <label className="en">Home</label>
                            <label className="mr">मुखपृष्ठ</label>
                            <label className="hn">मुखपृष्ठ</label>
                        </span>
                    </span>
                </NavLink>
                <NavLink
                    to={`about${search}`}
                    onClick={(e) => {
                        handleClick(e);
                    }}>
                    <span>
                        <i className="fa-light fa-briefcase"></i>
                        <span>
                            <label className="en">About</label>
                            <label className="mr">माहिती</label>
                            <label className="hn">जानकारी</label>
                        </span>
                    </span>
                </NavLink>
                <NavLink
                    to={`gallery${search}`}
                    onClick={(e) => {
                        handleClick(e);
                    }}>
                    <span>
                        <i className="fa-light fa-images"></i>
                        <span>
                            <label className="en">Gallery</label>
                            <label className="mr">गॅलरी</label>
                            <label className="hn">गॅलरी</label>
                        </span>
                    </span>
                </NavLink>

                {(upiId || paymentGateway || bankAccount) &&
                    <NavLink
                        to={`payus${search}`}
                        onClick={(e) => {
                            handleClick(e);
                        }}>
                        <span>
                            <i className="fa-light fa-wallet"></i>
                            <span>
                                <label className="en">Pay Us</label>
                                <label className="mr">व्यवहार</label>
                                <label className="hn">व्यवहार</label>
                            </span>
                        </span>
                    </NavLink>
                }
                <div
                    className="tabs-floor"
                    ref={tabFloor}
                    style={dimensions}
                ></div>
            </div>
        </>
    );
}
export default Tabs;
