


// rafc
import React from 'react'

export const HumanButton = ( {value ,setRerender} ) => {

    const handleHumanClick = (e) => {

            const value = e.target.value
        console.log(e.target.value)

        fetch('http://localhost:9999/api/v1/human', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify( { human: value})
        })
       // .then ( () => setRerender(setRerender => !setRerender)
       .then ( () => setRerender(prev => !prev)

       )
    }

  return (
    <section className='humanButton '>
        <button onClick={handleHumanClick} value={value}  > + </button>
    </section>
  )
}
