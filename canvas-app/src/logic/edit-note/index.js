const { validate, errors: { NotFoundError } } = require('canvas-utils')
const API_URL = process.env.REACT_APP_API_URL

export default function(id, newDescription) {
  validate.string(id)
  validate.string.notVoid('id', id)

  validate.string(newDescription)
  validate.string.notVoid('newDescription', newDescription)

  return (async () => {
    const res = await fetch(`${API_URL}/notes/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ newDescription })
    })

    if (res.status === 201) return
    if (res.status === 404) throw new NotFoundError(JSON.parse(res.body).message)
    throw new Error(JSON.parse(res.body).message)
  })()
}