import { useEffect, useState } from 'react'
import '../App.css'
import { getMySentMessages, getMyReceivedMessages } from '../services/messageService'
import SingleMessage from './SingleMessage'

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
        <div id="pysty" key="sentMessages">
          <u>Sent messages</u>
          {
            sentMessages.map(message => <SingleMessage key={message.id} message={message} />)
          }
        </div>
        <div id="pysty" key="receivedMessages">
          <u>Received messages</u>
          {
            receivedMessages.map(message => <SingleMessage key={message.id} message={message} />)
          }
        </div>
      </div>
    </div>
  )
}

export default Messages