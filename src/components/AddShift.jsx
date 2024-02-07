import { useState } from "react"

const AddShift = (props) => {
  const [newDate, setNewDate] = useState('')
  const [newStart, setNewStart] = useState('')
  const [newEnd, setNewEnd] = useState('')

  const handleDateChange = (event) => {
    setNewDate(event.target.value)
  }
  const handleStartChange = (event) => {
    setNewStart(event.target.value)
  }
  const handleEndChange = (event) => {
    setNewEnd(event.target.value)
  }

  const addShift = (event) => {
    event.preventDefault()
    const shiftObject = {
      date: newDate,
      start: newStart,
      end: newEnd,
      company: 1,
      shiftId: props.shifts.length + 1,
      employeeId: 2,
    }
    props.setShifts(props.shifts.concat(shiftObject))

    setNewDate('')
    setNewStart('')
    setNewEnd('')
  }
  console.log(newDate)
  return (
    <div className="formDiv">
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
        <button id='create' type="submit">add</button>
      </form>
    </div>
  )
}

export default AddShift