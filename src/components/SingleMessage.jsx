import { useState } from "react"
import '../App.css'

const SingleMessage = (props) => {
  const [message, setMessage] = useState(props.message)
  // console.log(message)
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