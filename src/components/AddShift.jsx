import { useState, useEffect } from "react"
import '../App.css'
import { createNewShift } from "../services/shiftService"

const AddShift = (props) => {
  const [startDate, setStartDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endDate, setEndDate] = useState('')
  const [endTime, setEndTime] = useState('')
  const [newShiftFor, setNewShiftFor] = useState('')
  const [employeeList, setEmployeeList] = useState([])
  const [shiftWarning, setShiftWarning] = useState('')

  useEffect(() => {
    setEmployeeList(props.employees)
  }, [props.employees])

  useEffect(() => {
    const employeeFound = props.employees.find(emp => emp.id === newShiftFor)
    if (employeeFound) {
      const employeeShiftFound = employeeFound.shifts.find(shift => shift.startDate.split('T')[0] === startDate)
      employeeShiftFound ? setShiftWarning('This employee already has a shift for this day') : setShiftWarning('')
    }
  }, [startDate, newShiftFor])

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value)
    setEndDate(event.target.value)
  }
  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value)
  }
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value)
  }
  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value)
  }
  const handleEmployeeChange = (event) => {
    setNewShiftFor(event.target.value)
  }
  
  const addShift = async (event) => {
    event.preventDefault()
    const shiftObject = {
      startDate: startDate,
      startTime: startTime,
      endDate: endDate,
      endTime: endTime,
      company: props.company,
      employeeId: newShiftFor,
    }
    
    try {
      const newShift = await createNewShift(shiftObject)
      
      props.addShift(newShift)

      setStartDate('')
      setStartTime('')
      setEndDate('')
      setEndTime('')
      setNewShiftFor('')
      const element = document.getElementById("employeeSelect")
      element.value = "default"
      setShiftWarning('')
    } catch(error) {
      console.log(error)
    }
    
  }
  
  const checkValid = () => {
    return  startDate !== '' &&
            startTime !== '' &&
            endDate !== '' &&
            endTime !== '' &&
            newShiftFor !== '' &&
            shiftWarning === ''
    ? <button id='createShift' type="submit">add shift</button>
    : <button id='createShift' type="submit" disabled>add shift</button>
  }
  
  return (
    <div id='palikka'>
      <form onSubmit={addShift}>
        New shift<br/>
        start:
          <input
            id='StartDate'
            type='date'
            value={startDate}
            onChange={handleStartDateChange}
          />
          <input
            id='startTime'
            type='time'
            value={startTime}
            onChange={handleStartTimeChange}
          /> <br/>
        end:
          <input
            id='endDate'
            type='date'
            value={endDate}
            onChange={handleEndDateChange}
          />
          <input
            id='endTime'
            type='time'
            value={endTime}
            onChange={handleEndTimeChange}
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
          </select> <br/>
        { checkValid() } <br/>
        { shiftWarning }
      </form>
    </div>
  )
}

export default AddShift