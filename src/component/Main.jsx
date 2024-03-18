import React, { useEffect, useState } from 'react'
import TopNav from './TopNav'
import '../assets/css/Main.css'
import Button from './Button'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useJwt } from 'react-jwt'
import Cookies from 'js-cookie'

export default function Main() {
    let navigate =useNavigate();
    // let location = useLocation();

    //  Token
     let tokenFromURL = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxMDE1MTA4NzU0IiwidW5pcXVlX25hbWUiOiLYrtin2YTYryAzMzQ0NyDYudio2K_Yp9mE2YTZhyAzMzQ0NyDZhdit2YXYryAzMzQ0NyDYp9mE2YXYrdmF2K_ZiiAzMzQ0NyIsImZhbWlseV9uYW1lIjoi2KfZhNmF2K3Zhdiv2YogMzM0NDciLCJJRCI6IjEwMTUxMDg3NTQiLCJSYW5rTmFtZSI6ItmF2YLYr9mFIiwiU3ViQWdlbmN5SWQiOiI4NDcyZGEwNC1jNDc0LTQxNTItYTE2ZS1kM2M0MDRmYTIxMjIiLCJTdWJBZ2VuY3lOYW1lIjoiMdiv2YrZiNin2YYg2YjYstin2LHYqSDYp9mE2K_Yp9iu2YTZitipIiwiVXNlclR5cGUiOiJFbXBsb3llZSIsIklQQWRkcmVzcyI6IjQ2LjE1Mi40MS42NiIsIlVzZXJUeXBlSWQiOiIwIiwiRW1wbG95ZWVUeXBlIjoiTWFydGlhbCIsIkVtcGxveWVlVHlwZUlkIjoiMSIsIm5iZiI6MTcxMDI3MTE5MiwiZXhwIjoxNzEyODYzMTkyLCJpYXQiOjE3MTAyNzExOTJ9.RmRRhUl8K3F-8TlF_iXJ9KZuoLxVfs0pVv1Npb5_aByPKG3jVSfQATF11S33kSniwzLIppuHnXhZ5tAGwcH3tPg3pO_rD5JxFL2oqrJl7HZVB74vAoap348j5IAfxNPTc9bGAQ8LxrLh3EEZsABvFBf5FSlIRctQJZkRJmJYwUmorYbP9_mYWbBa1dVYWTerchBiUsiCwgrY2y0q9TEbsJw0RbkNc9zJbkAe3t9yIcbwgzFbTNL-9AOa56L_YSAUzu9jq8JeRueWtep7TAzsXUmcPoQJBAF1Q6c_WH9hPaQ76T9yG34iwL4Em7qZwRqVEWN9JOTrRU7xEM1hl59m1w";
       
   
    // let[tokenFromURL , setTokenUrl]=useState(null)
    // useEffect(()=>{
    //     const extractTokenFromURL = () => {
    //         // Get URL parameters
    //         const queryParams = new URLSearchParams(window.location.search);
    //         // Retrieve token from parameters
    //         const tokenFromURL = queryParams.get('token');
    //         // Update state with the token
    //         setTokenUrl(tokenFromURL || '');
    //       };
    //       extractTokenFromURL();
    // },[])

    //set at Cooki
    useEffect(()=>{
        const setTokenAsCookie = () => {
        Cookies.set('myToken', tokenFromURL, { expires: 7 });
        };
        setTokenAsCookie();
    },[])

    //get Cooki
    useEffect(() => {
        const getTokenFromCookie = () => {
          // Retrieve token from cookie
          const tokenFromCookie = Cookies.get('myToken');
          console.log(tokenFromCookie);
        };
        getTokenFromCookie();
      }, [])

    //decoded token 
     const {decodedToken , isExpired} = useJwt(tokenFromURL)
     console.log(decodedToken);


    let checkToken = ()=>{
        if (tokenFromURL) {
            navigate("/status");
        } else {
            console.log('Token not found in the URL');
            navigate("/error")
        }
    }

  return (<>
    <section className='main-page bg-light'>
        <div className="container">
            <div className="main-serves text-center m-5">
                <i className="logo fa-solid fa-plane-departure"></i>
                <h2 className='mt-3'>خدمة طلب إجـازة</h2>
            </div>
            <div className="serves-info">
                <h3>أهلا بك في خدمة طلب إجازة !</h3>
                <p>مكان واحد يجمع الخدمات الخاصة بإنجازات موظفي ومنسوبي وزارة الداخلية<br></br> , من هناك يمكنك تقديم طلب إجازة جديد وتقديم طلب إالغاء إجازة ومتابعة الإجازات <br></br>الساببقة ويمكنك مشاركة إجازاتك معغ الاخرين مكان واحد </p>
                <h6 className='h6'>{tokenFromURL}</h6>
            </div>
        </div>
        <div className="text-center almarai-light px-5 mt-5">
                    <Button content={"استمرار"} onClick={checkToken}/>
        </div>
    </section>
    </>
  )
}
