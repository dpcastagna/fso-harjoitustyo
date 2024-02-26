import { useState, useEffect } from "react"
import '../App.css'

const AddShift = (props) => {
  const [newDate, setNewDate] = useState('')
  const [newStart, setNewStart] = useState('')
  const [newEnd, setNewEnd] = useState('')
  const [newShiftFor, setNewShiftFor] = useState(0)
  const [employeeList, setEmployeeList] = useState([])

  useEffect(() => {
    setEmployeeList(props.users.filter(user => user.companyId === 1 && user.role === 'employee'))
  }, [props.users])

  // console.log(employeeList, props.users)
  const handleDateChange = (event) => {
    setNewDate(event.target.value)
  }
  const handleStartChange = (event) => {
    setNewStart(event.target.value)
  }
  const handleEndChange = (event) => {
    setNewEnd(event.target.value)
  }
  const handleShiftChange = (event) => {
    setNewShiftFor(event.target.value)
  }

  const addShift = (event) => {
    event.preventDefault()
    const shiftObject = {
      date: newDate,
      start: newStart,
      end: newEnd,
      company: 1,
      employeeId: Number(newShiftFor),
      shiftId: Math.round(Math.random() * 1000000),
    }
    props.setShifts(props.shifts.concat(shiftObject))

    setNewDate('')
    setNewStart('')
    setNewEnd('')
  }
  // console.log(newShiftFor)
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
          /> <br />
        start:
          <input
            id='start'
            type='number'
            value={newStart}
            onChange={handleStartChange}
            placeholder='8'
            min='0'
            max='23'
          /> <br />
        end:
          <input
            id='end'
            type='number'
            value={newEnd}
            onChange={handleEndChange}
            placeholder='16'
            min='0'
            max='23'
          /> <br />
        employee:
          <select onChange={handleShiftChange}>
            <option>Select...</option>
            {
              employeeList.map(employee => {
                // console.log(employee)
                return(
                  <option key={employee.id} value={employee.id}>{employee.name}</option>
                )
              }
              )
            }
          </select> <br />
        <button id='create' type="submit">add shift</button>
      </form>
    </div>
  )
}

export default AddShift