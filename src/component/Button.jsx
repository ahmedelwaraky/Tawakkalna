import React from 'react'

export default function Button({content ,onClick, disabled ,type="button"}) {
  return ( <>
  <section id="themeButton">
    <div className="contaier">
        <button type={type} className="btn  px-5 text-white fs-5 fw-bold w-100 main-btn "  onClick={onClick} disabled={disabled}>{content}</button>
    </div>
  </section>
</>
  )
}
