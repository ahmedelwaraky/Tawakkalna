import React from 'react'
import TopNav from './TopNav'

export default function Error() {
  return (
    <>
    <section>
      <TopNav herf={'/login'} content={"الرئسية"}/>
        <div className="container">
            <div className="alert alert-danger py-5 px-4 m-2">
                غير قادر على التحقيق !
            </div>
        </div>
    </section>
    </>
  )
}
