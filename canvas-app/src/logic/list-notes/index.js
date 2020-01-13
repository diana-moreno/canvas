import call from '../../utils/call'
const API_URL = process.env.REACT_APP_API_URL

export default function() {
  return (async () => {
    const res = await call(`${API_URL}/notes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (res.status === 200) return JSON.parse(res.body).notes
    throw new Error(JSON.parse(res.body).message)
  })()
}