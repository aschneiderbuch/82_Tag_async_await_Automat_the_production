

// rafc
import React, { useEffect } from 'react'
import { useState } from 'react'

export const OutputAnzeige = ( {rerender} ) => {

  const [data, setData] = useState()
  useEffect( () => {
    console.log("rerender")

    fetch('http://localhost:9999/api/v1/workload'  )
    .then(res => res.json())
    .then(data => {
      setData(data)

    })

  },[rerender])



  return (
    <section className='outputAnzeige'>
        <h1>Capacity</h1>
    <section style={{height:"500px" , backgroundColor:"purple"}}>
        <article style={{height:`${data*10}px`, backgroundColor:"yellow"}} ></article>
        </section>
    </section>
  )
}
