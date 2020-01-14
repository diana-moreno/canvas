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
    throw new Error(JSON.parse(res.body).message)
  })()
}
