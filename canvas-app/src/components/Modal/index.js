import React from 'react'
import './index.sass'

export default function({ error, title, hint, onBack }) {
  return (
    <section className="modal">
      <div className='modal__container'>
        <div className={ error ? 'modal__error' : 'modal__hint'}>
          { error && <p>Ups! Something went wrong.</p> }
          { hint && <h3>{title}</h3> }
          <p>{error || hint}</p>
        </div>
        <button
          className='modal__button'
          onClick={onBack}
        >Ok</button>
      </div>
    </section>
  )
}