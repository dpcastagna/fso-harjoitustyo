import '../App.css'
import { useState, useEffect } from 'react'

const AllShifts = (props) => {
  const [employeeList, setEmployeeList] = useState([])

  useEffect(() => {
    setEmployeeList(props.employees.filter(user => user.role === 'employee'))
  }, [props.users])
  // console.log(props)
  return (
    <div id='palikka'>
      <div style={{ paddingBottom: 3, borderBottom: 'solid', borderBottomWidth: 3 }}>Employee shifts <br/></div>
      <div id='vaaka' >
        {
          employeeList.map(user => {
            const employeeShifts = user.shifts
            // console.log(employeeShifts)
            return (
              <div key={user.id}>
                {user.name} { user.working ? <div id='working'>Working</div> : <div id='notWorking'>Not working</div> } <br/>
                {
                  employeeShifts.length > 0
                  ? employeeShifts.map(shift => <div key={shift.shiftId }>{shift.start}-{shift.end} {shift.date} <br/></div>)
                  : <>No shifts</>
                }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default AllShifts