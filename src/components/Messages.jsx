import { useEffect, useState } from 'react'
import '../App.css'
import { getMySentMessages, getMyReceivedMessages } from '../services/messageService'

const Messages = (props) => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    setMessages(getMySentMessages(props.user.company, props.user.username))
  },[])
  console.log(messages)
  return (
    <div id="palikka">
      Messagejaaa
      {
        // messages.map(message => {<>{message.content}</>})
      }
    </div>
  )
}

export default Messages