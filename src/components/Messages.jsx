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
    employeeToAddMessage.messages = employeeToAddMessage.messages.concat(obj)
    console.log(employeeToAddMessage)
    
    setSentMessages(sentMessages.concat({...obj, employeeId: { name: employeeToAddMessage.name, id: employeeToAddMessage.id }}))
  }

  const deleteMessage = (id) => {
    const employeeToDeleteMessageId = props.employees.find(message => message.id === id).employeeId.id
    const employeeToDeleteMessage = employees.find(employee => employee.id === employeeToDeleteMessageId)
    setSentMessages(shifts.filter(shift => shift.id !== id))
    
    employeeToDeleteMessage.messages = employeeToDeleteMessage.messages.filter(message => message.id !== id)
  }

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
              ? sentMessages.map(message => <SingleMessage key={message.id} message={message} />)
              : <>No sent messages</>
            }
          </div>
          <div id="pysty" key="receivedMessages">
            <u>Received messages</u>
            {
              receivedMessages.length > 0
              ? receivedMessages.map(message => <SingleMessage key={message.id} message={message} />)
              : <>No received messages</>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages