import { useState, useEffect } from "react"
import '../App.css'
import { createNewShift } from "../services/shiftService"

const AddShift = (props) => {
  const [newDate, setNewDate] = useState('')
  const [newStart, setNewStart] = useState('')
  const [newEnd, setNewEnd] = useState('')
  const [newShiftFor, setNewShiftFor] = useState('')
  const [employeeList, setEmployeeList] = useState([])
  const [shiftWarning, setShiftWarning] = useState('')
  const [valid, setValid] = useState(false)

  useEffect(() => {
    setEmployeeList(props.employees)
  }, [props.employees])

  const handleDateChange = (event) => {
    setNewDate(event.target.value)
  }
  const handleStartChange = (event) => {
    setNewStart(event.target.value)
  }
  const handleEndChange = (event) => {
    setNewEnd(event.target.value)
  }
  const handleEmployeeChange = (event) => {
    setNewShiftFor(event.target.value)
    console.log('newShiftFor', newShiftFor, 'event', event.target.value)
    const employeeFound = props.employees.find(emp => emp.id === event.target.value)
    console.log(employeeFound, newDate)
    const employeeShiftFound = employeeFound.shifts.find(shift => shift.date.split('T')[0] === newDate)
    console.log(employeeShiftFound)
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

    setNewDate(null)
    setNewStart(null)
    setNewEnd(null)
    setNewShiftFor(null)
    const element = document.getElementById("employeeSelect")
    element.value = "default"
    setShiftWarning('')
    setValid(false)
  }

  const checkValid = () => {
    newDate && newStart && newEnd && newShiftFor
    ? setValid(true)
    : null
  }
  
  return (
    <div id='palikka'>
      <form onSubmit={addShift}>
        New shift<br/>
        date:
          <input
            id='date'
            type='date'
            value={newDate}
            onChange={handleDateChange}
            placeholder='blog title'
          /> <br/>
        start:
          <input
            id='start'
            type='number'
            value={newStart}
            onChange={handleStartChange}
            placeholder='8'
            min='0'
            max='23'
          /> <br/>
        end:
          <input
            id='end'
            type='number'
            value={newEnd}
            onChange={handleEndChange}
            placeholder='16'
            min='0'
            max='23'
          /> <br/>
        employee:
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
          </select> {shiftWarning} <br/>
        <button id='createShift' type="submit">add shift</button>
      </form>
    </div>
  )
}

export default AddShift