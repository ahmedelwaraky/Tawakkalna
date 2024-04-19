import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import {useNavigate} from 'react-router-dom'
import { useJwt } from 'react-jwt'
import Button from './Button'
import LoadingButton from './LoadingButton'
import '../assets/css/Form.css'
import '../assets/css/Order.css'
import * as Yup from 'yup'
import axios from 'axios'
import Cookies from 'js-cookie'
import { TabContext } from './TapContext'



export default function Form() {
    const { currentTab, setCurrentTab } = useContext(TabContext);

    let [isLoading , setLoading]= useState(false)
    let [error , setError]= useState(null)
    let navigate =useNavigate()
    let [image, setImage] = useState(null);
    let [submitFormFlag, setSubmitFormFlag] = useState(false); // Flag to indicate whether to submit the form or not



    let [Token ,setToken] = useState(null)
    //get token
     useEffect(() => {
        const getTokenFromCookie = () => {
          const tokenFromCookie = Cookies.get('myToken');
          console.log(tokenFromCookie);
          setToken(tokenFromCookie)
        };
        getTokenFromCookie();
      }, []);

    //decode token
    const { decodedToken, isExpired } = useJwt(Token);
    console.log(decodedToken);

    //image
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
        setImage(reader.result);
        };
        if (file) {
        reader.readAsDataURL(file);
        }
    }

  
    //validation
    let validationSchema = Yup.object().shape({
        startDate: Yup.string().required('تاريخ بداية الأجازة مطلوب'),
        endDate: Yup.string().required('تاريخ نهاية الأجازة مطلوب'),
        noofdays: Yup.number().positive('عدد الأيام المطلوب يجب ان يكون أكثر من 0').required('عدد الأيام مطلوب').typeError('يجب أن يكون عددًا'),
        VacationType: Yup.string().required('نوع الأجازة مطلوب'),
        comments: Yup.string()
    });

    //formik
    let formik =useFormik({
        initialValues :{
            // name:"",
            startDate: "",
            endDate:  "",
            noofdays:  "",
            VacationType:  "",
            comments:  "",
        }, validationSchema:validationSchema,
        onSubmit :submitForm
    })
    
    // call api
    async function submitForm(values){
        
        if (values.VacationType === "اختر نوع الاجازه") {
            return;
        }else if(!submitFormFlag){
            return;
        }else{
            setLoading(true)
            const body = {
                ...values , 
                "nationalID": decodedToken.ID  , 
                "Name": decodedToken.unique_name,      
                "Rank": decodedToken.RankName,                  
                "SubagencyName":decodedToken.SubAgencyName  
            }
            try {
                let response = await axios.post(`https://mob.coursaty.net/vacation/saveRequest` , body  );
                console.log(response);
                if (response.status === 200){
                    // setCurrentTab("1")
                    areSure()
                    setLoading(false);
                }
                // console.log(values);
            } catch (error) {
                setLoading(false);
                setError(error);
                console.log('Error fetching data:', error);
            }
        }


       
    }

    //Calculate Number Of Days
      useEffect(() => {
        const calculateNumberOfDays = () => {
            const startDate = new Date(formik.values.startDate); //inputDate
            const endDate = new Date(formik.values.endDate); //inputDate
            const differenceInTime = endDate.getTime() - startDate.getTime();
            const differenceInDays = differenceInTime / (1000 * 3600 * 24);
            formik.setFieldValue('noofdays', differenceInDays);
        };
        calculateNumberOfDays(); 
    }, [formik.values.startDate, formik.values.endDate]); 


    function Containue() {
        submitForm(formik.values)
        setCurrentTab("1");
        setLoading(false);
        document.querySelector('.mother').style.display = 'none';
    }

    function Cancel(){
        document.querySelector('.mother').style.display = 'none';
        setSubmitFormFlag(false);
    }

    function areSure(){
        document.querySelector('.mother').style.display = 'block';
        setSubmitFormFlag(true); 
    }

   
    
  return <>
  <section id='form' className=''>
    {/* alert  */}
    <div className="mother">
        <div className="send-alert mx-2 rounded-4 bg-white">
            <div className="top d-flex justify-content-between px-4 py-3">
                <i class="fa-solid fa-angle-right"></i>
                <h5 className='almarai-regular'>إرسال الطلب</h5>
                <i class="fa-solid fa-xmark"  onClick={Cancel}></i>
            </div>
            <div className='info pt-3'>
                <i className="fa-solid fa-bell "></i> 
                <h6 className="py-2 almarai-light">هل أنت متأكد من إرسال الطلب </h6>
            </div><hr/>
            <div className="btns d-flex justify-content-around py-3">
                <button className='btn border border-1 yes' onClick={Containue}>نعم</button>
                <button className='btn border border-1 no' onClick={Cancel}>لا</button>
            </div>
        </div>
    </div>
    {/* alert  */}
    <div className="container mx-auto">     
                <form className='bg-white shadow-sm rounded-4  p-3'  onSubmit={formik.handleSubmit}>
                    <div className="d-flex align-items-center">
                        <div className="position-relative rounded-circle overflow-hidden m-auto" style={{ width: '70px', height: '70px' }}>
                            {image ? (
                            <img src={image} alt="Selected" className="w-100 h-100 object-fit-cover" />
                            ) : (
                            <label htmlFor="inputImage" className="position-absolute top-0 start-0 w-100 h-100 bg-secondary text-center d-flex justify-content-center align-items-center">
                                <i class="fa-solid fa-camera text-white fs-4"></i>
                                <input type="file" id="inputImage" className="position-absolute top-0 start-0 opacity-0 w-100 h-100" onChange={handleImageChange} />
                            </label>
                            )}
                        </div>
                    </div>
    
                    <div className="mb-3">
                        <label htmlFor="startDate" className="form-label almarai-light fw-bold">تاريخ البداية</label>
                        <input type="date" className="form-control rounded-3 fw-b" id="startDate"  name='startDate' value={formik.values.startDate} onChange={formik.handleChange} onBlur={formik.handleBlur} max={formik.values.endDate-1} />
                        {formik.errors.startDate && formik.touched.startDate ? (
                            <div className='alert mt-2 p-2 alert-danger'>{formik.errors.startDate}</div>
                        ) : null}
                    </div>
    
                    <div className="mb-3">
                        <label htmlFor="endDate" className="form-label almarai-light fw-bold">تاريخ النهاية</label>
                        <input type="date" className="form-control rounded-3" id="endDate" name='endDate' value={formik.values.endDate} onChange={formik.handleChange} onBlur={formik.handleBlur} min={formik.values.startDate}/>
                        {formik.errors.endDate && formik.touched.endDate ? (
                            <div className='alert mt-2 p-2 alert-danger'>{formik.errors.endDate}</div>
                        ) : null}    
                    </div>
    
                    <div className="mb-3">
                        <label htmlFor="noofdays" className="form-label almarai-light fw-bold">عدد الأيام</label>
                        <input type="number" className="form-control rounded-3" id="noofdays" disabled min="1" name='noofdays' value={formik.values.noofdays} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {formik.errors.noofdays && formik.touched.noofdays ? (
                            <div className='alert mt-2 p-2 alert-danger'>{formik.errors.noofdays}</div>
                        ) : null}
                    </div>
    
    
                    <div className="mb-3">
                        <label htmlFor="VacationType" className="form-label almarai-light fw-bold">نوع الأجازة</label>
                        <select className="form-select rounded-3" id="VacationType" name='VacationType' value={formik.values.VacationType} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                            <option  className='almarai-light'>اختر نوع الاجازه</option>
                            <option value="إعتيادية" className='almarai-light'>سنوية</option>
                            <option value="طارئة" className='almarai-light'>مرضية </option>
                            <option value="مرضية" className='almarai-light'>اَخري</option>
                        </select>
                        {formik.errors.VacationType && formik.touched.VacationType ? (
                            <div className='alert mt-2 p-2 alert-danger'>{formik.errors.VacationType}</div>
                        ) : null}
                    </div>
    
                    <div className="mb-3">
                        <label htmlFor="comments" className="form-label almarai-light fw-bold">ملاحظات</label>
                        {/* <input type="text" className="form-control rounded-3" id="comments" name='comments' value={formik.values.comments} onChange={formik.handleChange} onBlur={formik.handleBlur}/> */}
                        <textarea class="form-control rounded-3" id="comments" name='comments' value={formik.values.comments} onChange={formik.handleChange} onBlur={formik.handleBlur} rows="3" ></textarea>

                        {formik.errors.comments && formik.touched.comments ? (
                            <div className='alert mt-2 p-2 alert-danger'>{formik.errors.comments}</div>
                        ) : null}    
                    </div>
    
                    <div className="text-center almarai-light">
                        {isLoading ? <LoadingButton/> : <Button disabled={!(formik.isValid && formik.dirty)} content={"إرسال الطلب"} onClick={areSure} />}   
                    </div>
                </form>
    </div>
  </section>
</>
}





