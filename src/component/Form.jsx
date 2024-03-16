import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import {useNavigate} from 'react-router-dom'
import { useJwt } from 'react-jwt'
import Button from './Button'
import LoadingButton from './LoadingButton'
import '../assets/css/Form.css'
import '../assets/css/Order.css'
import * as Yup from 'yup'
import axios from 'axios'


export default function Form() {
    let [isLoading , setLoading]= useState(false)
    let [error , setError]= useState(null)
    let navigate =useNavigate()
    const [image, setImage] = useState(null);
    // const [tokenIsExpired, setIsExpired] = useState(false);

    //get token
    const storedToken = localStorage.getItem("token");
    //decode token
    const { decodedToken, isExpired } = useJwt(storedToken);
    
    const config = {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      };


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
        // name: Yup.string().required('الاسم مطلوب'),
        startDate: Yup.string().required('تاريخ بداية الأجازة مطلوب'),
        endDate: Yup.string().required('تاريخ نهاية الأجازة مطلوب'),
        numberOfDays: Yup.number().positive('عدد الأيام المطلوب يجب ان يكون أكثر من 0').required('عدد الأيام مطلوب').typeError('يجب أن يكون عددًا'),
        VacationType: Yup.string().required('نوع الأجازة مطلوب'),
        comments: Yup.string()
    });

    //formik
    let formik =useFormik({
        initialValues :{
            // name:"",
            startDate: "",
            endDate:  "",
            numberOfDays:  "",
            VacationType:  "",
            comments:  "",
        }, validationSchema:validationSchema,
        onSubmit :submitForm
    })

    //token at url
    // useEffect(() => {
    //     const url = window.location.href;
    //     const params = new URLSearchParams(url);
    //     const token = params.get('token');
    //     console.log('Token:', token);
    // }, []);
    
    // call api
    async function submitForm(values){
        setLoading(true)
        const body = {
            ...values , 
            "nationalID": decodedToken.ID  , 
            "Name": decodedToken.unique_name,      
            "Rank": decodedToken.RankName,                  
            "SubagencyName":decodedToken.SubAgencyName  
        }
        try {
            let response = await axios.post(`http://94.130.9.202:5050/vacation/saveRequest` , body ,config );
            // console.log(response);
            if (response.status === 200){
                setLoading(false);
            }
            // console.log(values);
        } catch (error) {
            setLoading(false);
            setError(error);
            console.log('Error fetching data:', error);
        }
    }


    //Calculate Number Of Days
    useEffect(() => {
        const calculateNumberOfDays = () => {
            const startDate = new Date(formik.values.startDate); //inputDate
            const endDate = new Date(formik.values.endDate); //inputDate
            const differenceInTime = endDate.getTime() - startDate.getTime();
            const differenceInDays = differenceInTime / (1000 * 3600 * 24);
            formik.setFieldValue('numberOfDays', differenceInDays);
        };
        calculateNumberOfDays(); 
    }, [formik.values.startDate, formik.values.endDate]); 

    
  return <>
  <section id='form' className=''>

                <div className="container mx-auto">
                <form className='pt-3 bg-white shadow-sm rounded-4 mt-3 p-3'  onSubmit={formik.handleSubmit}>
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
    
                    {/* <div className="mb-3">
                        <label htmlFor="name" className="form-label almarai-light fw-bold">الاسم</label>
                        <input type="text"  className="form-control rounded-3 fw-b" id="name" name='name' value={formik.values.name}  onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {formik.errors.name && formik.touched.name ? (
                            <div className='alert mt-2 p-2 alert-danger'>{formik.errors.name}</div>
                        ) : null}
                    </div> */}
    
                    <div className="mb-3">
                        <label htmlFor="startDate" className="form-label almarai-light fw-bold">تاريخ البداية</label>
                        <input type="date" className="form-control rounded-3 fw-b" id="startDate"  name='startDate' value={formik.values.startDate} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.startDate && formik.touched.startDate ? (
                            <div className='alert mt-2 p-2 alert-danger'>{formik.errors.startDate}</div>
                        ) : null}
                    </div>
    
                    <div className="mb-3">
                        <label htmlFor="endDate" className="form-label almarai-light fw-bold">تاريخ النهاية</label>
                        <input type="date" className="form-control rounded-3" id="endDate" name='endDate' value={formik.values.endDate} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {formik.errors.endDate && formik.touched.endDate ? (
                            <div className='alert mt-2 p-2 alert-danger'>{formik.errors.endDate}</div>
                        ) : null}    
                    </div>
    
                    <div className="mb-3">
                        <label htmlFor="numberOfDays" className="form-label almarai-light fw-bold">عدد الأيام</label>
                        <input 
                            type="number" 
                            className="form-control rounded-3" 
                            id="numberOfDays" 
                            min="1" 
                            name='numberOfDays' 
                            value={formik.values.numberOfDays} 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur}
                            onKeyPress={(e) => {
                                if (e.key === '0') {
                                    e.preventDefault();
                                }
                            }}
                        />
                        {formik.errors.numberOfDays && formik.touched.numberOfDays ? (
                            <div className='alert mt-2 p-2 alert-danger'>{formik.errors.numberOfDays}</div>
                        ) : null}
                    </div>
    
    
                    <div className="mb-3">
                        <label htmlFor="VacationType" className="form-label almarai-light fw-bold">نوع الأجازة</label>
                        <select className="form-select rounded-3" id="VacationType" name='VacationType' value={formik.values.VacationType} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                            <option value="إعتيادية" className='almarai-light'>إعتيادية</option>
                            <option value="طارئة" className='almarai-light'>طارئة </option>
                            <option value="مرضية" className='almarai-light'>مرضية</option>
                        </select>
                        {formik.errors.VacationType && formik.touched.VacationType ? (
                            <div className='alert mt-2 p-2 alert-danger'>{formik.errors.VacationType}</div>
                        ) : null}
                    </div>
    
                    <div className="mb-3">
                        <label htmlFor="comments" className="form-label almarai-light fw-bold">ملاحظات</label>
                        <input type="text" className="form-control rounded-3" id="comments" name='comments' value={formik.values.comments} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {formik.errors.comments && formik.touched.comments ? (
                            <div className='alert mt-2 p-2 alert-danger'>{formik.errors.comments}</div>
                        ) : null}    
                    </div>
    
    
                    <div className="text-center almarai-light">
                        {isLoading ? <LoadingButton/> : <Button disabled={!(formik.isValid && formik.dirty)} content={"إرسال الطلب"} />}  
                                   
                    </div>
                </form>
            </div>
            
        
  </section>
</>
}





