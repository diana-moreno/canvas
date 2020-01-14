import React from 'react'
import './index.sass'

export default function({ error, onBack }) {
  return (
    <section className="feedback">
      <div className='feedback__container'>
        <div className='feedback__message'>
          <p>Ups! Something went wrong.</p>
          <p>{error}</p>
        </div>
        <button
          className='feedback__button'
          onClick={onBack}
        >Back</button>
      </div>
    </section>
  )
}