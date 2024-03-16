import React from 'react'
import '../assets/css/TopNav.css'
import OpactiyImg from '../assets/images/opacity.png'

export default function TopNav({herf ,content} ) {

    
  return (
    <>
    <section id="TopNav" className='bg-light'>
        <div className="">
            <div className="bg-image m-auto">
                <img className='OpactiyImg' src={OpactiyImg} alt=""></img>

                <div className="holiday d-flex justify-content-between">

                    <div className="left">
                        <a href={herf} className='text-white almarai-regular  link-underline link-underline-opacity-0'><i class="fa-solid fa-chevron-right text-white "></i>{content}</a>
                    </div>


                    {/* <div className="right">
                        <img className='' src={ALARM} alt=""></img>
                        <i class="fa-regular fa-bell fs-4 text-white"></i>
                    </div> */}
                </div>

            </div>
        </div>
    </section>
    </>
  )
}
