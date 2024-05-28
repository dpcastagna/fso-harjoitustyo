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
    console.log(employeeToAddMessage)
    employeeToAddMessage.messages = employeeToAddMessage.messages.concat(obj)
    
    setSentMessages(sentMessages.concat({...obj, employeeId: { name: employeeToAddMessage.name, id: employeeToAddMessage.id }}))
    
    // const otherEmployees = props.employees.filter(employee => employee.id !== obj.receiver)
    
    // setEmployees(otherEmployees.concat(employeeToAddShift).sort((a, b) => {  //sorting employees to prevent their order changing
    //   if(a.id < b.id) {
    //     return -1
    //   }
    //   return 1
    // }))
  }

  const deleteMessage = (id) => {
    const employeeToDeleteShiftId = shifts.find(shift => shift.id === id).employeeId.id
    const employeeToDeleteShift = employees.find(employee => employee.id === employeeToDeleteShiftId)
    setShifts(shifts.filter(shift => shift.id !== id))
    
    employeeToDeleteShift.messages = employeeToDeleteShift.shifts.filter(shift => shift.id !== id)
    
    // const otherEmployees = employees.filter(employee => employee.id !== employeeToDeleteShiftId)
    
    // setEmployees(otherEmployees.concat(employeeToDeleteShift).sort((a, b) => {  //sorting employees to prevent their order changing
    //   if(a.id < b.id) {
    //     return -1
    //   }
    //   return 1
    // }))
  }

  if (sentMessages === null || receivedMessages === null) {
    console.log(props)
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