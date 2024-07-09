import '../App.css'
import { useState, useEffect } from 'react'
import { removeOldShift } from '../services/shiftService'

const AllShifts = (props) => {
  const [employeeList, setEmployeeList] = useState([])
  const [shifts, setShifts] = useState([])

  useEffect(() => {
    setEmployeeList(props.employees.filter(user => user.role === 'employee'))
    setShifts(props.shifts)
  }, [props.users, props.shifts])
  
  const removeShift = async (id) => {
    try {
      await removeOldShift(id)
      props.deleteShift(id)
    } catch (error) {
      console.log(error.message)
    }
  }
  
  return (
    <div id='palikka'>
      <div style={{ paddingBottom: 3, borderBottom: 'solid', borderBottomWidth: 3 }}>All shifts <br/></div>
      <div id='pysty' >
        {
          shifts.map(shift => {
            console.log(shift)
            return (
              <div key={shift.id}>
                <div key={shift.shiftId }>
                  {shift.startTime}-{shift.endTime} {shift.startDate} &nbsp;
                  {
                    shift.employeeId !== null
                    ? shift.employeeId.name
                    : 'unknown'
                  }
                  &nbsp;
                  {
                    shift.employeeId !== null
                    ? shift.employeeId.id 
                    : 'unknown'
                  }
                  &nbsp;
                  <button onClick={() => {removeShift(shift.id)}} >delete</button>
                  <br/>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default AllShifts