import React, { useState } from 'react'
import TopNav from './TopNav'
import '../assets/css/Main.css'
import Button from './Button'
import { Link, useNavigate } from 'react-router-dom'
import { useJwt } from 'react-jwt'

export default function Main() {
    //Token
    const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxMDE1MTA4NzU0IiwidW5pcXVlX25hbWUiOiLYrtin2YTYryAzMzQ0NyDYudio2K_Yp9mE2YTZhyAzMzQ0NyDZhdit2YXYryAzMzQ0NyDYp9mE2YXYrdmF2K_ZiiAzMzQ0NyIsImZhbWlseV9uYW1lIjoi2KfZhNmF2K3Zhdiv2YogMzM0NDciLCJJRCI6IjEwMTUxMDg3NTQiLCJSYW5rTmFtZSI6ItmF2YLYr9mFIiwiU3ViQWdlbmN5SWQiOiI4NDcyZGEwNC1jNDc0LTQxNTItYTE2ZS1kM2M0MDRmYTIxMjIiLCJTdWJBZ2VuY3lOYW1lIjoiMdiv2YrZiNin2YYg2YjYstin2LHYqSDYp9mE2K_Yp9iu2YTZitipIiwiVXNlclR5cGUiOiJFbXBsb3llZSIsIklQQWRkcmVzcyI6IjQ2LjE1Mi40MS42NiIsIlVzZXJUeXBlSWQiOiIwIiwiRW1wbG95ZWVUeXBlIjoiTWFydGlhbCIsIkVtcGxveWVlVHlwZUlkIjoiMSIsIm5iZiI6MTcxMDI3MTE5MiwiZXhwIjoxNzEyODYzMTkyLCJpYXQiOjE3MTAyNzExOTJ9.RmRRhUl8K3F-8TlF_iXJ9KZuoLxVfs0pVv1Npb5_aByPKG3jVSfQATF11S33kSniwzLIppuHnXhZ5tAGwcH3tPg3pO_rD5JxFL2oqrJl7HZVB74vAoap348j5IAfxNPTc9bGAQ8LxrLh3EEZsABvFBf5FSlIRctQJZkRJmJYwUmorYbP9_mYWbBa1dVYWTerchBiUsiCwgrY2y0q9TEbsJw0RbkNc9zJbkAe3t9yIcbwgzFbTNL-9AOa56L_YSAUzu9jq8JeRueWtep7TAzsXUmcPoQJBAF1Q6c_WH9hPaQ76T9yG34iwL4Em7qZwRqVEWN9JOTrRU7xEM1hl59m1w";
    //Set Token
    localStorage.setItem("token", token);
    //get token 
    const storedToken = localStorage.getItem("token")
    //decoded token 
    const {decodedToken , isExpired} = useJwt(storedToken)

    let navigate =useNavigate();


    let checkToken = ()=>{
        if (isExpired) {
            navigate("/error");

        } else {
            navigate("/status");
        }
    }

  return (
    <>
    <section className='main-page bg-light'>
        {/* هنا نضع مسار الصفحة الاساسيه للتطبيق */}
        <TopNav herf={'/'}  content={"الرئسية"}/>   
        <div className="container">
            <div className="main-serves text-center m-5">
                <i className="logo fa-solid fa-plane-departure"></i>
                <h2 className='mt-3'>خدمة طلب إجـازة</h2>
            </div>
            <div className="serves-info">
                <h3>أهلا بك في خدمة طلب إجازة !</h3>
                <p>مكان واحد يجمع الخدمات الخاصة بإنجازات موظفي ومنسوبي وزارة الداخلية<br></br> , من هناك يمكنك تقديم طلب إجازة جديد وتقديم طلب إالغاء إجازة ومتابعة الإجازات <br></br>الساببقة ويمكنك مشاركة إجازاتك معغ الاخرين مكان واحد </p>
            </div>
        </div>
        <div className="text-center almarai-light px-5 mt-5">
                    <Button content={"استمرار"} onClick={checkToken}/>
        </div>
    </section>
    </>
  )
}
