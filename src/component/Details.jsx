import React, { useEffect, useState } from 'react'
import TopNav from './TopNav'
import '../assets/css/Details.css'
import axios from 'axios';
import { useJwt } from 'react-jwt';
import { RotatingLines } from 'react-loader-spinner'
import {useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie'
import FollowToggle from './FollowToggle';



export default function Details() {
    let [showComponent, setShowComponent] = useState(false);

    const handleClick = () => {
        setShowComponent(true);
    };




    let [userdata, setUserData] = useState(null);
    let navigate =useNavigate() 


    let [Token ,setToken] = useState(null)
    //get token
    // const storedToken = localStorage.getItem("token");
    useEffect(() => {
        // Function to retrieve and decode token from cookie
        const getTokenFromCookieAndDecode = () => {
          // Retrieve token from cookie
          const tokenFromCookie = Cookies.get('myToken');
          console.log(tokenFromCookie);
          setToken(tokenFromCookie)
        };
        // Call the function to retrieve and decode token when the component mounts
        getTokenFromCookieAndDecode();
      }, [])





    //decode token
    const { decodedToken, isExpired } = useJwt(Token);
    
    //get id
    let parmas = useParams();
    let orderId=(parmas.id);
    console.log(orderId);

    //url
    let username = decodedToken?.ID;;
    const apiUrl = `https://mob.coursaty.net/vacation/get?username=${username}`;

    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl );
                const usersData = response.data.data
                const oneUser = usersData && usersData.find(us=>
                    us.id == orderId 
                )
                console.log(oneUser);
                setUserData(oneUser)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [decodedToken]);

    console.log(userdata);
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
        <section className='userDetails' >
            <div className="container pt-4 ">
                <div className={`accecpting text-center text-white  ${userdata?.status === "مرفوض" ? "bg-red" : userdata?.status === "مفتوح" ? "bg-green" : "bg-gray"}`}>
                    <h6 className=''>{userdata?.status}</h6>
                </div>

                <div className="detail shadow-sm border border-1  pt-3 px-3">
                    <div className="div d-flex justify-content-between border-bottom py-2">
                        <h6 className=''>الاسم</h6>
                        <h5 className='h6 '>{userdata?.name.split(' ')[0]} {userdata?.name.split(' ')[userdata?.name.split(' ').length - 2]}</h5>
                    </div>
                   <div className="div d-flex justify-content-between border-bottom py-2">
                
                        <h6 className=''>القطاع</h6>
                        <h5 className='h6 '>{userdata?.subagencyName}</h5>
                    </div>
                    
                    <div className="div d-flex justify-content-between border-bottom py-2">
                        <h6 className=''>الرتبة</h6>
                        <h5 className='h6 '>{userdata?.rank}</h5>
                    </div>
                    
                    <div className="div d-flex justify-content-between border-bottom py-2">
                        <h6 className=''>رقم الطلب</h6>
                        <h5 className='h6 '>{userdata?.id}</h5>
                    </div>
                    
                    <div className="div d-flex justify-content-between border-bottom py-2">
                        <h6 className=''>تاريخ الطلب </h6> 
                        <h5 className='h6 '>{userdata?.requestDate.split("T")[0]}</h5>
                    </div>
            
                    <div className="div d-flex justify-content-between border-bottom py-2">
                        <h6 className=''>تاريخ البداية  </h6>
                        <h5 className='h6 '>{userdata?.startDate.split("T")[0]}</h5>
                    </div> 
                    
                    <div className="div d-flex justify-content-between border-bottom py-2">
                        <h6 className=''>تاريخ النهاية  </h6>
                        <h5 className='h6 '>{userdata?.endDate.split("T")[0]}</h5>
                    </div>
                    
                    <div className="div d-flex justify-content-between border-bottom py-2">
                        <h6 className=''>عدد الأيام</h6>
                        <h5 className='h6 '>{userdata?.noofdays}</h5>
                    </div>
                    
                    <div className="div d-flex justify-content-between border-bottom py-2">
                        <h6 className=''>نوع الأجازة</h6>
                        <h5 className='h6 '>{userdata?.vacationType}</h5>
                    </div>
                    
                    <div className="div d-flex justify-content-between border-bottom py-2">
                        <h6 className=''>ملاحظات</h6>
                        <h5 className='h6 '></h5>
                    </div>

                    <div className="d-flex justify-content-around my-2">

                        {userdata?.status === "مفتوح" && (
                            <>
                                <buuton className="btn border border-1 rounded px-4">
                                    طباعةالقرار <i class="fa-solid fa-print"></i>
                                </buuton>
                                
                                <buuton className="btn border border-1 rounded px-4">
                                    عرض القرار <i class="fa-regular fa-eye"></i>
                                </buuton>
                            </>
                        )}

                        {(userdata?.status === "منتهي") && (
                            <>
                                <buuton className="btn border border-1 rounded px-4" onClick={handleClick} >
                                    متابعة الطلب <i class="fa-solid fa-list-check"></i>
                                </buuton>
                            </>
                        )}
                    </div>   
                </div>
            </div> 
            <div className="follow">
                {showComponent && <FollowToggle />}
            </div>
        </section>
      </>
    )
}    