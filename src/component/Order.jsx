import React, { useState, useEffect } from 'react';
import FRAMA from '../assets/images/Frame.png';
import STATUS1 from '../assets/images/status1.png';
import '../assets/css/Order.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useJwt } from 'react-jwt';

export default function Order() {
    const [orderData, setData] = useState(null);
    const storedToken = localStorage.getItem("token");
    const {decodedToken, isExpired}  = useJwt(storedToken);
    console.log(decodedToken);

    // let username = decodedToken.ID;
    let username = '1015108754';
    const apiUrl = `http://94.130.9.202:5050/vacation/get?username=${username}`;

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/details');
    }  

    useEffect(() => {
        // if (!storedToken) {
        //     console.warn('Token not found');
        //     return;
        // }

        // if (!decodedToken || !decodedToken.decodedToken || !decodedToken.decodedToken.ID) {
        //     console.warn('Decoded token or username not found');
        //     return;
        // }

        const config = {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          };
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl,config);
                let responseData =response.data.data
               
                setData(responseData);
    
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    
return (<>
    <section id="order" className=''>
        <div className="container mx-auto my-3 ">
            <div className="main-section d-flex justify-content-between  bg-white border border-1  rounded-4" onClick={handleClick}>
                <div className="numer-order d-flex p-3">
                    <div className="img pe-3 pt-2">
                        <img src={FRAMA} alt="" />
                    </div>
                    <div className="text ">
                        <h2 className='h6 almarai-regular fw-bold'>طلب رقم 1 </h2>
                        <p className='almarai-regular'>{orderData?.[0].requestDate.split('T')[0]}<small></small></p>
                    </div>
                </div>

                <div className="order-status pe-5 p-relative">
                    <img src={STATUS1} alt="status" />
                    <p className='almarai-regular'><small>{orderData?.[0].status}</small></p>
                </div>

            </div>
        </div>
    </section>
</>)
}
