import React from 'react'
import '../assets/css/Order.css'
import { Link, useNavigate,  } from 'react-router-dom'

export default function Toggle() {
    let navigate = useNavigate()

    function privacy(){
        navigate('/privacy')
    }
    function questions(){
        navigate('/questions')
    }
    function contact(){
        navigate('/contact')
    }

  return (<>
 <section className='toggle'>
    <h6 class="gap-1  py-2">
        <div className='line' data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"></div>
    </h6>
    <div class="collapse" id="collapseExample">
        <div class=" rounded-0">
            <div className="policy d-flex justify-content-between px-3" onClick={privacy}>
                <h2 className='h5'>سياسة الخصوصية </h2>
                <i className="fa-regular fa-file-lines fs-4"></i>
            </div>
            <hr/>

            <div className="common  d-flex justify-content-between px-3" onClick={questions}>
                <h2 className='h5'>الأسئلة الشائعة</h2>
                <i class="fa-regular fa-circle-question fs-4"></i>
            </div>
            <hr/>

            <div className="contact  d-flex justify-content-between px-3" onClick={contact}>
                <h2 className='h5'> توصل معنا</h2>
                <i class="fa-solid fa-phone fs-4"></i>
            </div>
            <hr/>
        </div>
    </div>
</section>

  </>
  )
}
