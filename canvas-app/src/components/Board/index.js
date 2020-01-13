import React, {useState, useEffect} from 'react'
import './index.sass'
import Header from '../Header'
import Box from '../Box'
import boxes from './constants.js'
import logic from '../../logic'
const { listNotes } = logic


const BoardSection = function({ className, boxes, notes }){
  return <section className={className}>
    { boxes.map(box => {
      const { indexBox, icon, title, group, hint } = box
      return <Box
        indexBox={indexBox}
        icon={icon}
        title={title}
        group={group}
        hint={hint}
        key={indexBox}
        notes={notes && notes.filter(elem => elem.indexBox === indexBox)}
      />
    }
    )}
  </section>
}

export default function () {
  const [notes, setNotes] = useState()

  useEffect(() => {
    (async () => {
      const notes = await listNotes()
      setNotes(notes)
    })()
  }, [notes])

  return <>
    <Header />
    <main className='board'>
      <BoardSection
        boxes={boxes.slice(0, 7)}
        className='board__top'
        notes={notes}
      />
      <BoardSection
        boxes={boxes.slice(7, 9)}
        className='board__bottom'
        notes={notes}
      />
    </main>
  </>
}
