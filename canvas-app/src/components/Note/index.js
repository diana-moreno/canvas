import React from 'react'

export default function({ group, description }) {
 return <li className={`item item--${group}`}>{description}</li>
}
