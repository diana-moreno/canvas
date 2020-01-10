import React, {useState, useEffect} from 'react'
import './index.sass'
import Header from '../Header'
import Box from '../Box'

const boxes = [
  {index: 0, icon: 'all_inclusive', title: 'KEY PARTNERS', group: 'how'},
  {index: 1, icon: 'work_outline', title: 'KEY ACTIVITIES', group: 'how'},
  {index: 2, icon: 'location_city', title: 'KEY RESOURCES', group: 'how'},
  {index: 3, icon: 'redeem', title: 'VALUE PROPOSITIONS', group: 'what'},
  {index: 4, icon: 'group', title: 'CUSTOMER RELATIONSHIPS', group: 'with'},
  {index: 5, icon: 'local_shipping', title: 'CHANNELS', group: 'with'},
  {index: 6, icon: 'list_alt', title: 'CUSTOMER SEGMENTS', group: 'with'},
  {index: 7, icon: 'money_off', title: 'COST STRUCTURE', group: 'how-many'},
  {index: 8, icon: 'attach_money', title: 'REVENUE STREAMS', group: 'how-many'}
]

export default function () {

  return (
    <body>
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
          />) }
        </section>
      </main>
    </body>
  )
}
