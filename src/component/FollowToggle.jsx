import React from 'react'
import '../assets/css/FollowToggle.css'

export default function FollowToggle() {
    return (<>
        <section className='followToggle  pt-3 rounded-5 bg-white'>
           <h6 class="gap-1  py-3">
               <div className='line' data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"></div>
           </h6>
           <div class="collapse" id="collapseExample">
                <div className="one pb-3">
                    <div class=" rounded-0 d-flex px-3">
                        <div className="right">
                            <i class="fa-solid fa-circle-dot"></i>
                            <div className="solid"></div>
                        </div>
                        <div className="left d-flex rounded-3 py-2 px-4 ">
                            <div className="img">
                                <i class="fa-regular fa-circle-check 5"></i>
                            </div>
                            <div className="info">
                                <h3 className='almarai-regular pb-1'>ماجد بن عبدالله بن محمد </h3>
                                <h4 className='almarai-regular'>(السجلات)</h4>
                                <h5 className='almarai-light'>15/05/2018</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="two pb-3">
                    <div class=" rounded-0 d-flex px-3">
                        <div className="right">
                            <i class="fa-solid fa-circle-dot"></i>
                            <div className="solid"></div>
                        </div>
                        
                        <div className="left d-flex rounded-3 py-2 px-4 ">
                            <div className="img">
                                <i class="fa-regular fa-circle-check 5"></i>
                            </div>
                            <div className="info">
                                <h3 className='almarai-regular pb-1'>محمد بن خالد بن عبدالله</h3>
                                <h4 className='almarai-regular'>(مدير عام)</h4>
                                <h5 className='almarai-light'>15/05/2018</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="three pb-3">
                    <div class=" rounded-0 d-flex px-3">
                        <div className="right">
                            <i class="fa-regular fa-circle-dot"></i>
                            <div className="dash"></div>
                        </div>
                        
                        <div className="left d-flex rounded-3 py-2 px-4 ">
                            <div className="img">
                                <i class="fa-regular fa-circle-check 5"></i>
                            </div>
                            <div className="info">
                                <h3 className='almarai-regular pb-1'>محمد بن سعد بن محمد</h3>
                                <h4 className='almarai-regular'>(مدير الضباط)</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="four pb-3">
                    <div class=" rounded-0 d-flex px-3">
                        <div className="right">
                            <i class="fa-regular fa-circle-dot"></i>
                            <div className="dash"></div>
                        </div>
                        
                        <div className="left d-flex rounded-3 py-2 px-4 ">
                            <div className="img">
                                <i class="fa-regular fa-circle-check 5"></i>
                            </div>
                            <div className="info">
                                <h3 className='almarai-regular pb-1'>سعد بن حمد بن محمد</h3>
                                <h4 className='almarai-regular'>(مدير الأعتماد النهائي)</h4>
                            </div>
                        </div>
                    </div>
                </div> 
           </div>
       </section>
</>)
}
