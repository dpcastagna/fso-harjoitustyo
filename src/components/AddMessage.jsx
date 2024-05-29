import { useState, useEffect } from "react"
import '../App.css'
// import { createNewShift } from "../services/shiftService"
import { createNew } from "../services/messageService"

const AddMessage = (props) => {
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')
  const [messageFor, setMessageFor] = useState('')
  const [employeeList, setEmployeeList] = useState([])

  useEffect(() => {
    setEmployeeList(props.employees)
  }, [props.employees])
  // console.log(props)
  // useEffect(() => {
  //   const employeeFound = props.employees.find(emp => emp.id === newShiftFor)
  //   if (employeeFound) {
  //     const employeeShiftFound = employeeFound.shifts.find(shift => shift.date.split('T')[0] === newDate)
  //     employeeShiftFound ? setShiftWarning('This employee already has a shift for this day') : setShiftWarning('')
  //   }
  // }, [newDate, newShiftFor])

  const handleSubjectChange = (event) => {
    setSubject(event.target.value)
  }
  const handleContentChange = (event) => {
    setContent(event.target.value)
  }
  const handleEmployeeChange = (event) => {
    setMessageFor(event.target.value)
  }
  
  const newMessage = async (event) => {
    event.preventDefault()
    const messageObject = {
      subject: subject,
      content: content,
      company: props.user.company,
      receiver: messageFor,
    }
    // console.log(messageObject)
    const newMessage = await createNew(messageObject)
    props.addMessage(newMessage)

    setSubject('')
    setContent('')
    setMessageFor('')
    const element = document.getElementById("employeeSelectMessage")
    element.value = "default"
  }

  const checkValid = () => {
    return subject !== '' && content !== '' && messageFor !== ''
    ? <button id='createMessage' type="submit">send message</button>
    : <button id='createMessage' type="submit" disabled>send message</button>
  }

  return (
    <div>
      <center>
        <h2>New Message</h2>
        <form onSubmit={newMessage}>
          subject:
            <input
              id='subject'
              type='text'
              value={subject}
              onChange={handleSubjectChange}
              // placeholder='8'
            /> <br/>
          message:
            <input
              id='content'
              type='text'
              value={content}
              onChange={handleContentChange}
              // placeholder='16'
            /> <br/>
          To employee:
            <select name="employeeSelect" id="employeeSelectMessage" onChange={handleEmployeeChange}>
              <option value="default">Select...</option>
              {
                employeeList.map(employee => {
                  
                  return (
                    <option key={employee.id} value={employee.id}>{employee.name}</option>
                  )
                }
                )
              }
            </select> <br/>
          { checkValid() } <br/>
        </form>
      </center>
    </div>
  )
}

export default AddMessage