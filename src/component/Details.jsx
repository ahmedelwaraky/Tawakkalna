import React, { useEffect, useState } from 'react'
import TopNav from './TopNav'
import '../assets/css/Details.css'
import axios from 'axios';
import { useJwt } from 'react-jwt';
import { RotatingLines } from 'react-loader-spinner'
import { useNavigate, useParams } from 'react-router-dom';


export default function Details() {
    let [userdata, setUserData] = useState(null);
    let navigate =useNavigate()

    // const [tokenIsExpired, setIsExpired] = useState(false);
    //get token
    const storedToken = localStorage.getItem("token");
    //decode token
    const { decodedToken, isExpired } = useJwt(storedToken);
    
    //get id
    let parmas = useParams();
    let orderId=(parmas.id);
    console.log(orderId);
    //url
    let username = decodedToken?.ID;;
    const apiUrl = `http://94.130.9.202:5050/vacation/get?username=${username}`;
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
                console.log(userdata);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [decodedToken]);
    console.log(userdata);


    // if (!isExpired) {
    //     setIsExpired(isExpired)
    //     alert("Token has expired");
    //     navigate('/login')
    //     return null; 
    // }

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
                        <h5 className='h6 '>{decodedToken.EmployeeTypeId}</h5>
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
                    
                </div>
            </div>   
        </section>
      </>
    )
}    