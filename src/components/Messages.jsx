import { useEffect, useState } from 'react'
import '../App.css'
import { getMySentMessages, getMyReceivedMessages } from '../services/messageService'
import SingleMessage from './SingleMessage'
import AddMessage from './AddMessage'

const Messages = (props) => {
  const [sentMessages, setSentMessages] = useState(null)
  const [receivedMessages, setReceivedMessages] = useState(null)

  useEffect(() => {
    getMessages()
  },[])

  const getMessages = async () => {
    setSentMessages(await getMySentMessages(props.user.company, props.user.username))
    setReceivedMessages(await getMyReceivedMessages(props.user.company, props.user.username))
  }

  const addMessage = (obj) => {
    const employeeToAddMessage = props.employees.find(employee => employee.id === obj.receiver)
    // employeeToAddMessage.messages = employeeToAddMessage.messages.concat(obj)
    
    setSentMessages(sentMessages.concat({...obj, sender: { name: props.user.name }, receiver: { name: employeeToAddMessage.name}}))
  }

  const deleteMessage = (id) => {
    // const employeeToDeleteMessageId = props.employees.find(message => message.id === id).employeeId.id
    // const employeeToDeleteMessage = employees.find(employee => employee.id === employeeToDeleteMessageId)
    setSentMessages(sentMessages.filter(message => message.id !== id))
    
    // employeeToDeleteMessage.messages = employeeToDeleteMessage.messages.filter(message => message.id !== id)
  }
  console.log(props.user)
  if (sentMessages === null || receivedMessages === null) {
    return (<>Loading...</>)
  }
  
  return (
    <div id="palikka">
      <div id="pysty">
        <AddMessage  user={props.user} employees={props.employees} addMessage={addMessage} />
        <div id="vaaka">
          <div id="pysty" key="sentMessages">
            <u>Sent messages</u>
            {
              sentMessages.length > 0
              ? sentMessages.map(message => <SingleMessage key={message.id} message={message} user={props.user} deleteMessage={deleteMessage} />)
              : <>No sent messages</>
            }
          </div>
          <div id="pysty" key="receivedMessages">
            <u>Received messages</u>
            {
              receivedMessages.length > 0
              ? receivedMessages.map(message => <SingleMessage key={message.id} message={message} /* user={props.user} deleteMessage={deleteMessage} */ />)
              : <>No received messages</>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages