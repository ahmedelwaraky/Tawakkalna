import React, { useEffect, useState } from 'react'
import '../assets/css/FollowToggle.css'
import Cookies from 'js-cookie'
import { isExpired, useJwt } from 'react-jwt'
import axios from 'axios'


export default function FollowToggle(props) {

    //get token
    let [Token , setToken] =useState(null)
    useEffect(()=>{
        let getTokenAndDecoded=()=>{
            const tokenFromCookie = Cookies.get('myToken')
            setToken(tokenFromCookie)
            console.log(tokenFromCookie);
        }
        getTokenAndDecoded()
    },[])

    //decoded Token
        let {decodedToken , isExpired} = useJwt(Token)
        console.log(decodedToken);

    //getId
        let username = decodedToken?.ID;
        console.log(username);
        let apiUrl = `https://mob.coursaty.net/vacation/get?username=${username}`;

    //fetchData
    let[steps , setSteps]= useState(null)
    let [orderData, setData] = useState(null);
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
            console.log(props.steps);
            setSteps(props.steps)
        }, []);

        console.log(steps);

       


    return (<>
        <section className='followToggle  pt-3 rounded-5 bg-white'>
           <h6 class="gap-1  py-3">
               <div className='line' data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"></div>
           </h6>
                <div class="collapse" id="collapseExample">
                <div className="one pb-3">
                     <div class=" rounded-0 d-flex px-3">
                         <div className="right">
                            {steps >= 1 ? (
                                <i class="fa-solid fa-circle-dot"></i> // Render regular circle dot
                            ) : (
                                <i class="fa-regular fa-circle-dot"></i> // Render solid circle dot
                            )}
                            {steps >= 1 ? (
                                <div className="solid"></div> // Render dash if steps equals 1
                            ) : (
                                <div className="dash"></div> // Render solid otherwise
                            )}
                        </div>
                        {steps >= 1 ?(
                            <div className="left d-flex rounded-3 py-2 px-4 bg-step">
                            <div className="img">
                                <i class="fa-solid fa-circle-check 5"></i>
                            </div>
                            <div className="info">
                                <h3 className='almarai-regular pb-1'>محمد بن خالد بن عبدالله</h3>
                                <h4 className='almarai-regular'>(مدير عــام )</h4>
                                <h5 className='almarai-light'>15/05/2018</h5>
                            </div>
                        </div>
                        ):(
                            <div className="left d-flex rounded-3 py-2 px-4">
                             <div className="img">
                                 <i class="fa-regular fa-circle-check 5"></i>
                             </div>
                             <div className="info">
                                 <h3 className='almarai-regular pb-1'>ماجد بن عبدالله بن محمد </h3>
                                 <h4 className='almarai-regular'>(السجلات)</h4>
                                 <h5 className='almarai-light'>15/05/2018</h5>
                             </div>
                         </div>
                        )}

                         
                     </div>
                 </div>
                 <div className="two pb-3">
                     <div class=" rounded-0 d-flex px-3">
                         <div className="right">
                            {steps >= 2 ? (
                                <i class="fa-solid fa-circle-dot"></i> // Render regular circle dot
                            ) : (
                                <i class="fa-regular fa-circle-dot"></i> // Render solid circle dot
                            )}
                            {steps >= 2 ? (
                                <div className="solid"></div> // Render dash if steps equals 1
                            ) : (
                                <div className="dash"></div> // Render solid otherwise
                            )}
                        </div>
                        {steps >= 2 ?(
                            <div className="left d-flex rounded-3 py-2 px-4 bg-step ">
                            <div className="img">
                                <i class="fa-solid fa-circle-check 5"></i>
                            </div>
                            <div className="info">
                                <h3 className='almarai-regular pb-1'>ماجد بن عبدالله بن محمد </h3>
                                <h4 className='almarai-regular'>(السجلات)</h4>
                                <h5 className='almarai-light'>15/05/2018</h5>
                            </div>
                        </div>
                        ):(
                            <div className="left d-flex rounded-3 py-2 px-4">
                             <div className="img">
                                 <i class="fa-regular fa-circle-check 5"></i>
                             </div>
                             <div className="info">
                                 <h3 className='almarai-regular pb-1'>ماجد بن عبدالله بن محمد </h3>
                                 <h4 className='almarai-regular'>(السجلات)</h4>
                                 <h5 className='almarai-light'>15/05/2018</h5>
                             </div>
                         </div>
                        )}
                     </div>
                 </div>
                 <div className="three pb-3">
                     <div class=" rounded-0 d-flex px-3">
                        <div className="right">
                            {steps >= 3 ? (
                                <i class="fa-solid fa-circle-dot"></i> // Render regular circle dot
                            ) : (
                                <i class="fa-regular fa-circle-dot"></i> // Render solid circle dot
                            )}
                            {steps >= 3  ? (
                                <div className="solid0"></div> // Render dash if steps equals 1
                            ) : (
                                <div className="dash0"></div> // Render solid otherwise
                            )}
                        </div>
                         { steps >= 3 ? (
                             <div className="left d-flex rounded-3 py-2 px-4 bg-step">
                             <div className="img">
                                 <i class="fa-solid fa-circle-check 5"></i>
                             </div>
                             <div className="info">
                                 <h3 className='almarai-regular pb-1'>محمد بن سعد بن محمد</h3>
                                 <h4 className='almarai-regular'>(مدير الضباط)</h4>
                             </div>
                         </div>
                         ):(
                            <div className="left d-flex rounded-3 py-2 px-4 ">
                            <div className="img">
                                <i class="fa-regular fa-circle-check 5"></i>
                            </div>
                            <div className="info">
                                <h3 className='almarai-regular pb-1'>محمد بن سعد بن محمد</h3>
                                <h4 className='almarai-regular'>(مدير الضباط)</h4>
                            </div>
                        </div>
                         )}
                        
                     </div>
                 </div>
                 <div className="four pb-3">
                     <div class=" rounded-0 d-flex px-3">
                        <div className="right">
                            {steps >= 4 ? (
                                <i class="fa-solid fa-circle-dot"></i> // Render regular circle dot
                            ) : (
                                <i class="fa-regular fa-circle-dot"></i> // Render solid circle dot
                            )}
                            {steps >= 4 ? (
                                <div className="solid0"></div> // Render dash if steps equals 1
                            ) : (
                                <div className="dash0"></div> // Render solid otherwise
                            )}
                        </div>
                        {steps >= 4 ? (
                            <div className="left d-flex rounded-3 py-2 px-4 bg-step">
                            <div className="img">
                                <i class="fa-solid fa-circle-check 5"></i>
                            </div>
                            <div className="info">
                                <h3 className='almarai-regular pb-1'>سعد بن حمد بن محمد</h3>
                                <h4 className='almarai-regular'>(مدير الأعتماد النهائي)</h4>
                            </div>
                        </div>
                        ):(
                            <div className="left d-flex rounded-3 py-2 px-4 ">
                             <div className="img">
                                 <i class="fa-regular fa-circle-check 5"></i>
                             </div>
                             <div className="info">
                                 <h3 className='almarai-regular pb-1'>سعد بن حمد بن محمد</h3>
                                 <h4 className='almarai-regular'>(مدير الأعتماد النهائي)</h4>
                             </div>
                         </div>
                        )}
                         
                     </div>
                 </div> 
                </div>
           
       </section>
</>)
}
