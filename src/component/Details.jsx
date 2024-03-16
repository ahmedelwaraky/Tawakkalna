import React, { useEffect, useState } from 'react'
import TopNav from './TopNav'
import '../assets/css/Details.css'
import axios from 'axios';
import { useJwt } from 'react-jwt';
import { RotatingLines } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom';


export default function Details() {
    const [userdata, setUserData] = useState(null);
    let navigate =useNavigate()
    const [tokenIsExpired, setIsExpired] = useState(false);
    // let username = decodedToken.ID;
    const username = '1015108754';

    //url
    const apiUrl = `http://94.130.9.202:5050/vacation/get?username=${username}`;
    //get token
    const storedToken = localStorage.getItem("token");
    //decode token
    const { decodedToken, isExpired } = useJwt(storedToken);


    const config = {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }
    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl ,config );
                setUserData(response.data.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    console.log(userdata);

    if (isExpired) {
        setIsExpired(isExpired)
        alert("Token has expired");
        navigate('/login')
        return null; 
    }

    //spinner
    if(userdata == null || userdata.lenght === 0){
        return<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <RotatingLines
            visible={true}
            height="50"
            width="50"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
            />
        </div>
    }

    return (<>
        <TopNav herf={'/'}  content={"الرئسية"}/>
        <section className='userDetails' >
            <div className="container ">
                <div className="accecpting text-center text-white  mt-4">
                    <h6 className=''>مقبــول</h6>
                </div>
                <div className="detail shadow-sm border border-1  pt-3 px-3">
                <div  className="div d-flex justify-content-between border-bottom py-2">
                            <h6 className=''>الاسم</h6>
                            <h5 className='h6 '>{decodedToken.unique_name.split(' ')[0]} {decodedToken.unique_name.split(' ')[decodedToken.unique_name.split(' ').length - 2]}</h5>
                        </div> 
                    
                    <div className="div d-flex justify-content-between border-bottom py-2">
                        <h6 className=''>القطاع</h6>
                        <h5 className='h6 '>{decodedToken.SubAgencyName}</h5>
                    </div>
                    
                    <div className="div d-flex justify-content-between border-bottom py-2">
                        <h6 className=''>الرتبة</h6>
                        <h5 className='h6 '>{decodedToken.RankName}</h5>
                    </div>
                    
                    <div className="div d-flex justify-content-between border-bottom py-2">
                        <h6 className=''>رقم الطلب</h6>
                        <h5 className='h6 '>{decodedToken.EmployeeTypeId}</h5>
                    </div>
                    
                    <div className="div d-flex justify-content-between border-bottom py-2">
                        <h6 className=''>تاريخ الطلب </h6>
                        <h5 className='h6 '>{userdata[0].requestDate.split("T")[0]}</h5>
                    </div>
            
                    <div className="div d-flex justify-content-between border-bottom py-2">
                        <h6 className=''>تاريخ البداية  </h6>
                        <h5 className='h6 '>{userdata[0].startDate.split("T")[0]}</h5>
                    </div>
                    
                    <div className="div d-flex justify-content-between border-bottom py-2">
                        <h6 className=''>تاريخ النهاية  </h6>
                        <h5 className='h6 '>{userdata[0].endDate.split("T")[0]}</h5>
                    </div>
                    
                    <div className="div d-flex justify-content-between border-bottom py-2">
                        <h6 className=''>عدد الأيام</h6>
                        <h5 className='h6 '>{userdata[0].noofdays}</h5>
                    </div>
                    
                    <div className="div d-flex justify-content-between border-bottom py-2">
                        <h6 className=''>نوع الأجازة</h6>
                        <h5 className='h6 '>{userdata[0].vacationType}</h5>
                    </div>
                    
                    <div className="div d-flex justify-content-between border-bottom py-2">
                        <h6 className=''>ملاحظات</h6>
                        <h5 className='h6 '></h5>
                    </div>
                    
                </div>
            </div>   
        </section>
      </>
    )
}    