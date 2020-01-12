import React, {useState, useEffect} from 'react'
import './index.sass'
import Header from '../Header'
import Box from '../Box'
import boxes from './constants.js'

const BoardSection = props => (
  <section className={props.className}>
    { props.boxes.map(box => {
      const { indexBox, icon, title, group, hint } = box
      return <Box
        indexBox={indexBox}
        icon={icon}
        title={title}
        group={group}
        hint={hint}
        key={indexBox}
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
