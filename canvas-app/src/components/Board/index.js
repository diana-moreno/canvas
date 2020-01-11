import React, {useState, useEffect} from 'react'
import './index.sass'
import Header from '../Header'
import Box from '../Box'
import boxes from './constants.js'

const BoardSection = props => (
  <section className={props.className}>
    { props.boxes.map(box => {
      const { index, icon, title, group, hint } = box
      return <Box
        index={index}
        icon={icon}
        title={title}
        group={group}
        hint={hint}
        key={index}
      />
    }
    )}
  </section>
)

export default function () {
  return <>
    <Header />
    <main className='board'>
      <BoardSection boxes={boxes.slice(0, 7)} className='board__top' />
      <BoardSection boxes={boxes.slice(7, 9)} className='board__bottom' />
    </main>
  </>
}
