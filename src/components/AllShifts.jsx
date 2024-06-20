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
  // console.log(props)
  return (
    <div id='palikka'>
      <div style={{ paddingBottom: 3, borderBottom: 'solid', borderBottomWidth: 3 }}>All shifts <br/></div>
      <div id='pysty' >
        {
          shifts.map(shift => {
            // const employeeShifts = user.shifts
            // console.log(shift.employeeId)
            return (
              <div key={shift.id}>
                <div key={shift.shiftId }>
                  {shift.start}-{shift.end} {shift.date} &nbsp;
                  {
                    shift.employeeId !== null
                    ? shift.employeeId.id 
                    : 'unknown'
                  }
                  <button onClick={() => {removeOldShift(shift.id)}} >delete</button>
                  <br/>
                </div>
                {/* {user.name} { user.working ? <div id='working'>Working</div> : <div id='notWorking'>Not working</div> } <br/>
                {
                  employeeShifts.length > 0
                  ? employeeShifts.map(shift => <div key={shift.shiftId }>{shift.start}-{shift.end} {shift.date} <br/></div>)
                  : <>No shifts</>
                } */}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default AllShifts