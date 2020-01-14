const { validate, errors: { NotFoundError } } = require('canvas-utils')
const API_URL = process.env.REACT_APP_API_URL

export default function(indexBox, description) {
  validate.number(indexBox)

  validate.string(description)
  validate.string.notVoid('description', description)

  return (async () => {
    const res = await fetch(`${API_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ indexBox, description })
    })

    if (res.status === 200) return res.json()
    if (res.status === 404) throw new NotFoundError('Not found. It is not possible to create a note.')
    throw new Error('Error conexion.')
  })()
}
