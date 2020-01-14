const { errors: { NotFoundError } } = require('canvas-utils')
const API_URL = process.env.REACT_APP_API_URL

export default function() {
  return (async () => {
    const res = await fetch(`${API_URL}/notes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (res.status === 200) return res.json()
    if (res.status === 404) throw new NotFoundError('Not found. It is not possible to list notes.')
    throw new Error('Error connecting.')
  })()
}
