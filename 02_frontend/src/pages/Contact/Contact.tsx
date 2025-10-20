import { useEffect, useState } from 'react'
import { fetchGreeting } from '../../lib/apiClient'

function Contact() {
  const [message, setMessage] = useState<string>('読み込み中...')

  useEffect(() => {
    let isMounted = true
    fetchGreeting().then((text) => {
      if (isMounted) setMessage(text)
    })
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div>
      <h2>Contact</h2>
      <p>お問い合わせページです。</p>
      <p>APIメッセージ: {message}</p>
    </div>
  )
}

export default Contact


