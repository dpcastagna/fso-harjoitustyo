import { useState } from "react"
import '../App.css'
import { removeOld } from "../services/messageService"

const SingleMessage = (props) => {
  const [message, setMessage] = useState(props.message)
  // console.log(message)

  const removeMessage = () => {
    // console.log('jee', message.content)
    props.deleteMessage(message.id)
  }

  if (!message) {
    return <div>Loading...</div>
  }
  return (
    <div id="palikka">
      Sender: {message.sender !== null ? message.sender.name : 'unknown'}<br/>
      Receiver: {message.receiver !== null ? message.receiver.name : 'unknown'}<br/>
      Sent: {message.timeSent}<br/>
      Subject: {message.subject}<br/>
      Message: {message.content}<br/>
      {
        props.user.role === "boss"
        ? <button onClick={removeMessage}>delete</button>
        : <></>
      }
    </div>
  )
}

export default SingleMessage