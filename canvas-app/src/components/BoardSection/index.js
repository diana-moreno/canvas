import React from 'react'
import Box from '../Box'

export default function({ className, boxes, notes, onCreateNewNote }) {
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
        onCreateNewNote={onCreateNewNote}
      /> })
    }
  </section>
}