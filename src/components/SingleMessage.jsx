import { useState } from "react"
import '../App.css'
import { removeOld } from "../services/messageService"

const SingleMessage = (props) => {
  const [message, setMessage] = useState(props.message)
  // console.log(message)

  const removeMessage = () => {

  }

  if (!message) {
    return <div>Loading...</div>
  }
  return (
    <div id="palikka">
      Sender: {message.sender.name}<br/>
      Receiver: {message.receiver.name}<br/>
      Sent: {message.timeSent}<br/>
      Subject: {message.subject}<br/>
      Message: {message.content}
    </div>
  )
}

export default SingleMessage