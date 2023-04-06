


// rafc
import React, { useEffect, useState } from 'react'
import { InputHuman } from '../components/InputHuman'
import { OutputAnzeige } from '../components/OutputAnzeige'
import { Sell } from '../components/Sell'

export const HomePage = () => {
const [money, setMoney] = useState()
const [rerender, setRerender] = useState(false)
    useEffect((effect) => {

        fetch('http://localhost:9999/api/v1/money')
        .then(res => res.json())
        .then(data => setMoney(data))
    },[rerender])

  return (
    <section className='homePage'>
        <h1>{money}$</h1>

<article>
<InputHuman setRerender={setRerender}></InputHuman>
<OutputAnzeige rerender={rerender}></OutputAnzeige>
<Sell setRerender={setRerender}></Sell>
</article>
    </section>
  )
}
