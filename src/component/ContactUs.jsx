import React from 'react'
import TopNav from './TopNav'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import Button from './Button';



export default function ContactUs() {
//validation 
const phoneRegExp = /^[0-9]{9,10}$/;
let validationSchema = Yup.object().shape({
  name : Yup.string().required("الاسم مطلوب"),
  address: Yup.string().required("العنوان مطلوب"),
  phoneOrEmail: Yup.string()
  .test('is-phone-or-email', 'يجب إدخال رقم هاتف أو بريد إلكتروني واحد فقط', function(value) {
    if (!value) return false; // Reject if value is empty
    const isPhone = phoneRegExp.test(value);
    const isEmail = Yup.string().email().isValidSync(value);
    return isPhone || isEmail;
  })
  .required('رقم الهاتف أو البريد الإلكتروني مطلوب'),
  comments: Yup.string()
})

//formik
let formik = useFormik({
    initialValues:{
        name : "",
        address : "",
        phoneOrEmail : "",
        comments : "",
    },
    validationSchema:validationSchema,
    onSubmit:submitfumction
})

function submitfumction(){
    alert("Done")
}

  return (
  <section className='Contact-Us'>
    <div className="container">
        <form className='pt-3 bg-white shadow-sm rounded-4 mt-3 p-3' onSubmit={formik.handleSubmit}>

            <div class="mb-3">
                <label for="name" class="form-label almarai-light fw-bold">الاسم</label>
                <input type="text" class="form-control rounded-3" id="name" placeholder= "" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                {formik.errors.name && formik.touched.name ?(
                    <div className='alert mt-2 p-2 alert-danger'>{formik.errors.name}</div>
                ): null}
            </div>
            

            <div class="mb-3">
                <label for="address" class="form-label almarai-light fw-bold">العنوان</label>
                <input type="text" class="form-control rounded-3" id="address" placeholder="" value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                {formik.errors.address && formik.touched.address?(
                    <div className='alert mt-2 p-2 alert-danger'>{formik.errors.address}</div>
                ):null}
            </div>

            <div class="mb-3">
                <label for="phoneOrEmail" class="form-label almarai-light fw-bold">الهاتف أو البريد الألكتروني </label>
                <input type="text" class="form-control rounded-3" id="phoneOrEmail" placeholder="" value={formik.values.phoneOrEmail} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                {formik.errors.phoneOrEmail && formik.touched.phoneOrEmail?(
                    <div className='alert mt-2 p-2 alert-danger'>{formik.errors.phoneOrEmail}</div>
                ):null}
            </div>

            <div className="mb-3">
                <label htmlFor="comments" className="form-label almarai-light fw-bold">ملاحظات</label>
                <textarea class="form-control rounded-3" id="comments" name='comments' rows="3" value={formik.values.comments} onChange={formik.handleChange} onBlur={formik.handleBlur}></textarea>
            </div>
            <div className="text-center almarai-light">
                <Button content={"إرسال "}/>
            </div>
        </form>
    </div>
  </section>
  )
}
