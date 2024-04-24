import { useState, useEffect } from "react"
import '../App.css'
import { createNewShift } from "../services/shiftService"

const AddMessage = (props) => {
  // const [newDate, setNewDate] = useState('')
  const [newStart, setNewStart] = useState('')
  const [newEnd, setNewEnd] = useState('')
  const [newShiftFor, setNewShiftFor] = useState('')
  const [employeeList, setEmployeeList] = useState([])
  // const [shiftWarning, setShiftWarning] = useState('')

  useEffect(() => {
    setEmployeeList(props.employees)
  }, [props.employees])
  
  // useEffect(() => {
  //   const employeeFound = props.employees.find(emp => emp.id === newShiftFor)
  //   if (employeeFound) {
  //     const employeeShiftFound = employeeFound.shifts.find(shift => shift.date.split('T')[0] === newDate)
  //     employeeShiftFound ? setShiftWarning('This employee already has a shift for this day') : setShiftWarning('')
  //   }
  // }, [newDate, newShiftFor])


  // const handleDateChange = (event) => {
  //   setNewDate(event.target.value)
  // }
  const handleStartChange = (event) => {
    setNewStart(event.target.value)
  }
  const handleEndChange = (event) => {
    setNewEnd(event.target.value)
  }
  const handleEmployeeChange = (event) => {
    setNewShiftFor(event.target.value)
  }
  
  const addShift = async (event) => {
    event.preventDefault()
    const shiftObject = {
      date: newDate,
      start: newStart,
      end: newEnd,
      company: props.company,
      employeeId: newShiftFor,
    }
    
    const newShift = await createNewShift(shiftObject)
    props.addShift(newShift)

    setNewDate('')
    setNewStart('')
    setNewEnd('')
    setNewShiftFor('')
    const element = document.getElementById("employeeSelect")
    element.value = "default"
    setShiftWarning('')
  }

  const checkValid = () => {
    return /* newDate !== '' && */ newStart !== '' && newEnd !== '' && newShiftFor !== '' && shiftWarning === ''
    ? <button id='createShift' type="submit">send message</button>
    : <button id='createShift' type="submit" disabled>send message</button>
  }

  return (
    <div>
      <center>
        <h2>New Message</h2>
        <form onSubmit={addShift}>
          {/* date:
            <input
              id='date'
              type='date'
              value={newDate}
              onChange={handleDateChange}
              placeholder='blog title'
            /> <br/> */}
          subject:
            <input
              id='start'
              type='text'
              value={newStart}
              onChange={handleStartChange}
              // placeholder='8'
              min='0'
              max='23'
            /> <br/>
          message:
            <input
              id='end'
              type='text'
              value={newEnd}
              onChange={handleEndChange}
              // placeholder='16'
              min='0'
              max='23'
            /> <br/>
          To employee:
            <select name="employeeSelect" id="employeeSelect" onChange={handleEmployeeChange}>
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
          {/* {shiftWarning} */}
        </form>
      </center>
    </div>
  )
}

export default AddMessage