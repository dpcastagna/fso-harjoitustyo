import { useEffect, useState } from 'react'
import '../App.css'
import { getMyMessages, /* getMyReceivedMessages */ } from '../services/messageService'
import SingleMessage from './SingleMessage'
import AddMessage from './AddMessage'
import { removeOld, createNew } from '../services/messageService'

const Messages = (props) => {
  const [sentMessages, setSentMessages] = useState(null)
  const [receivedMessages, setReceivedMessages] = useState(null)

  useEffect(() => {
    getMessages()
  },[])
  
  const getMessages = async () => {
    setSentMessages((await getMyMessages()).filter(message => message.receiver.name !== props.user.name))
    setReceivedMessages((await getMyMessages()).filter(message => message.receiver.name === props.user.name))
  }

  const addMessage = async (obj) => {
    const newMessage = await createNew(obj)

    const employeeToAddMessage = props.employees.find(employee => employee.id === newMessage.receiver)
    setSentMessages(sentMessages.concat({...newMessage, sender: { name: props.user.name }, receiver: { name: employeeToAddMessage.name}}))
  }

  const deleteMessage = (id) => {
    // const employeeToDeleteMessageId = props.employees.find(message => message.id === id).employeeId.id
    // const employeeToDeleteMessage = employees.find(employee => employee.id === employeeToDeleteMessageId)
    setSentMessages(sentMessages.filter(message => message.id !== id))
    setReceivedMessages(receivedMessages.filter(message => message.id !== id))
    console.log('jaaa', id)
    removeOld(id)
    
    // employeeToDeleteMessage.messages = employeeToDeleteMessage.messages.filter(message => message.id !== id)
  }
  // console.log(props.user)
  if (sentMessages === null || receivedMessages === null) {
    return (<>Loading...</>)
  }
  
  return (
    <div id="palikka">
      <div id="pysty">
        <AddMessage  user={props.user} employees={props.employees} addMessage={addMessage} />
        <div id="vaaka">
          <div><u>Sent messages</u></div>
          <div><u>Received messages</u></div>
        </div>
        <div id="vaaka">
          <div id="viestit" key="sentMessages">
            {
              sentMessages.length > 0
              ? sentMessages.map(message => <SingleMessage key={message.id} message={message} user={props.user} deleteMessage={deleteMessage} />)
              : <>No sent messages</>
            }
          </div>
          <div id="viestit" key="receivedMessages">
            {
              receivedMessages.length > 0
              ? receivedMessages.map(message => <SingleMessage key={message.id} message={message} user={props.user} deleteMessage={deleteMessage} />)
              : <>No received messages</>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages