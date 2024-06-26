import React, { useState, useEffect, useContext } from 'react';
import FRAMA from '../assets/images/Frame.png';
import open from '../assets/images/open.png';
 import wait from '../assets/images/wait.png';
import close from '../assets/images/close.png';
import '../assets/css/Order.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useJwt } from 'react-jwt';
import Cookies from 'js-cookie'
import { TabContext } from './TapContext'
import Toggle from './Toggle';



export default function Order() {
    let navigate = useNavigate();
    let [orderData, setData] = useState(null);
    const { currentTab, setCurrentTab } = useContext(TabContext);


    //get token
    let [Token ,setToken] = useState(null)
    useEffect(() => {
        const getTokenFromCookie = () => {
          const tokenFromCookie = Cookies.get('myToken');
          console.log(tokenFromCookie);
          setToken(tokenFromCookie)
        };
        getTokenFromCookie();
      }, [])

    //decode token
    let {decodedToken ,isExpired}  = useJwt(Token);

    let username = decodedToken?.ID;
    let apiUrl = `https://mob.coursaty.net/vacation/get?username=${username}`;

    useEffect(() => {
        let fetchData = async () => {
            try {
                let response = await axios.get(apiUrl);
                let responseData =response.data.data
                console.log("STRING " , responseData);
                setData(responseData);
    
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [decodedToken  ,currentTab]);

console.log(orderData);
    
return (<>
    <section id="order" className=''>
        <div className="container mx-auto py-3 ">
            {orderData && orderData.map((item)=>
                 <div key={item?.id} className="main-section bg-white border border-1 rounded-4 col-12 my-2" >
                    <Link className="main-order" to={`/details/${item?.id}`}>
                    <div className="number-order d-flex p-3">
                        <div className="img pe-3 pt-2">
                                <img src={FRAMA} alt="" />
                        </div>
                        <div className="text">
                            <h2 className='h6 almarai-regular fw-bold'>طلب رقم {item?.id}</h2>
                            <p className='almarai-regular'>{item?.requestDate.slice('T' , 10)}<small></small></p>
                        </div>
                    </div>

                    <div className="order-status pe-5">
                        {item.status === "مرفوض" ? (
                            <img src={close} alt="status" />
                        ) : item.status === "مقبول" ? (
                            <img src={open} alt="status" />
                        ) : (
                            <img src={wait} alt="status" />
                        )}
                        <p className='almarai-regular'><small>{item?.status}</small></p>
                    </div>

                    </Link>
                </div>
            )}
        </div>
        <div className="toggle-sec">
            <Toggle/>
        </div>
    </section>
</>)
}
