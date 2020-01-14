const { validate } = require('canvas-utils')
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
    throw new Error(JSON.parse(res.body).message)
  })()
}
