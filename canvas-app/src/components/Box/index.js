import React, {useState, useEffect} from 'react'
import './index.sass'
import Header from '../Header'

export default function ({ index, title, icon, group }) {

  return <>
    <div className={`box box-${index}`}>
      <div className='box__title'>
        <i className="material-icons">{icon}</i>
        <h3>{title}</h3>
        <i className="material-icons box__help">help_outline</i>
      </div>
      <div className='box__content'>
        <ul className='box__list-items'>
{/*          <li className={`item item--${group}`}>Example key 1</li>
          <li className={`item item--${group}`}>Example key 2</li>
          <li className={`item item--${group}`}>Example key 3</li>
          <li className={`item item--${group}`}>Example key 4</li>
          <li className={`item item--${group}`}>Example key 5</li>
          <li className={`item item--${group}`}>Example key 6</li>*/}
        </ul>
      </div>
      <div className='box__button-add'>
        <i className="material-icons">add_circle_outline</i>
      </div>
    </div>
  </>
}


