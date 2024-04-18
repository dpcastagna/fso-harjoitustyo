import { useEffect, useState } from 'react'
import '../App.css'
import { getMySentMessages, getMyReceivedMessages } from '../services/messageService'

const Messages = (props) => {
  const [sentMessages, setSentMessages] = useState(null)
  const [receivedMessages, setReceivedMessages] = useState(null)

  useEffect(() => {
    getMessages()
  },[])

  const getMessages = async () => {
    setSentMessages(await getMySentMessages( props.user.company, props.user.username ))
    setReceivedMessages(await getMyReceivedMessages( props.user.company, props.user.username ))
  }

  if (sentMessages === null || receivedMessages === null) {
    return (<>Loading...</>)
  }

  return (
    <div id="palikka">
      <div id="vaaka">
        <div id="pysty">
          <u>Sent messages</u>
          {
            sentMessages.map(message => <div key={message.id}>{message.content}</div>)
          }
        </div>
        <div id="pysty">
          <u>Received messages</u>
          {
            receivedMessages.map(message => <div key={message.id}>{message.content}</div>)
          }
        </div>
      </div>
    </div>
  )
}

export default Messages