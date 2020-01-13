import call from '../../utils/call'
const { validate, errors: { NotFoundError } } = require('canvas-utils')
const API_URL = process.env.REACT_APP_API_URL

export default function(id) {
  validate.string(id)
  validate.string.notVoid('id', id)

  return (async () => {
    const res = await call(`${API_URL}/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (res.status === 201) return
    if (res.status === 404) throw new NotFoundError(JSON.parse(res.body).message)
    throw new Error(JSON.parse(res.body).message)
  })()
}
