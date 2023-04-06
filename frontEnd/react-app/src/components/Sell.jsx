


//rfac
import React from 'react'
import { HumanButton } from './HumanButton'

export const Sell = ( {setRerender}) => {

  const handleClickSellAufNullSetzen = (e) => {

    console.log(e.target.value)

    fetch('http://localhost:9999/api/v1/sell' , {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      // * braucht nix, da er im backEnd auf 0 gesetzt wird
      // * und nur löscht,   value mit inputField wäre für Storno gut
      // body: JSON.stringify( { sell: e.target.value})
    })
    .then ( () => setRerender(prev => !prev))
  }

  return (
    <section className='sell'>
        <h1>Sell</h1>

<button onClick={handleClickSellAufNullSetzen} value={"0 ohne Funktion, da 0 über backEnd"}> $$$</button>

    </section>
  )
}
