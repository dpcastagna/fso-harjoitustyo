import { connect } from "react-redux"
import { useEffect, useState } from 'react'

import '../App.css'
import SingleMessage from './SingleMessage'
import AddMessage from './AddMessage'
import { getMyMessages, removeMessage, createMessage } from '../services/messageService'
import { setNotification } from '../reducers/notificationReducer'

const Messages = (props) => {
  const [sentMessages, setSentMessages] = useState([])
  const [receivedMessages, setReceivedMessages] = useState([])

  useEffect( () => {
    const getMessages = async () => {
      const messages = await getMyMessages()
      setSentMessages(messages.filter(message => message.receiver.name !== props.user.name))
      setReceivedMessages(messages.filter(message => message.receiver.name === props.user.name))
    }
    
    getMessages()
  }, [props.user])

  const addMessage = async (obj) => {
    const newMessage = await createMessage(obj)
    console.log(newMessage)

    const employeeToAddMessage = props.employees.find(employee => employee.id === newMessage.receiver)
    setSentMessages(sentMessages.concat({...newMessage, sender: { name: props.user.name }, receiver: { name: employeeToAddMessage.name}}))
  }

  const deleteMessage = async (id) => {
    try {
      const response = await removeMessage(id)
      console.log(response)
      // if(response.response.data.error) {
      //   props.setNotification(response.response.data.error, 5)
      // } else {
        setSentMessages(sentMessages.filter(message => message.id !== id))
        setReceivedMessages(receivedMessages.filter(message => message.id !== id))
      // }
    } catch(error) {
      console.log(error)
    }
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

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = {
  setNotification,
}

const ConnectedMessages = connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages)

export default ConnectedMessages