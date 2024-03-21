import '../App.css'
import { useEffect, useState } from "react"
import { getMyEmployees } from "../services/userService"

const AllEmployees = (props) => {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    setEmployees(props.employees)
  }, [props.employees])
  console.log(employees)
  return (
    <div id="vaaka">
      {
        employees.map(employee => {
          return (
            <div key={employee.id} id="palikka">
              Name: {employee.name}<br/>
              Messages: {employee.messages.length}<br/>
              Securitylevel: {employee.securityLevel}<br/>
              Shifts: {employee.shifts.length}<br/>
              { employee.working ? <div id='working'>Working</div> : <div id='notWorking'>Not working</div> } {/* <br/> */}
              {
                employee.shifts.length > 0
                ? employee.shifts.map(shift => <div key={shift.id }>{shift.start}-{shift.end} {shift.date} <br/></div>)
                : <>No shifts</>
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default AllEmployees