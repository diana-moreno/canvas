import React, {useState, useEffect} from 'react'
import './index.sass'
import Header from '../Header'
import Box from '../Box'
import boxes from './constants.js'

export default function () {

  return <>
    <Header />
    <main className='board'>
      <section className='board__top'>
        { boxes
            .slice(0, 7)
            .map(box => <Box
              index={box.index}
              icon={box.icon}
              title={box.title}
              group={box.group}
              hint={box.hint}
              key={box.index}
        />) }
      </section>
      <section className='board__bottom'>
        { boxes
            .slice(7, 9)
            .map(box => <Box
              index={box.index}
              icon={box.icon}
              title={box.title}
              group={box.group}
              hint={box.hint}
              key={box.index}
        />) }
      </section>
    </main>
  </>
}
