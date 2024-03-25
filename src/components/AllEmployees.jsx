import '../App.css'
import { useEffect, useState } from "react"
import { getMyEmployees } from "../services/userService"

const AllEmployees = (props) => {
  const [employees, setEmployees] = useState([])
  const [singleEmployee, setSingleEmployee] = useState('')

  useEffect(() => {
    setEmployees(props.employees)
  }, [props.employees])
  console.log(singleEmployee)
  return (
    <div id="pysty"> 
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
      <div id="vaaka">
        <div id="pysty">
          {
            employees.map(employee => {
              return (
                <button key={employee.id} onClick={() => {setSingleEmployee(employee)}}>{employee.name}</button>
              )
            })
          }
        </div>
        <div id="pysty">
          {
            singleEmployee === ''
            ? <>Select employee</>
            : <div key={singleEmployee.id} id="palikka">
                Name: {singleEmployee.name}<br/>
                Messages: {singleEmployee.messages.length}<br/>
                Securitylevel: {singleEmployee.securityLevel}<br/>
                Shifts: {singleEmployee.shifts.length}<br/>
                { singleEmployee.working ? <div id='working'>Working</div> : <div id='notWorking'>Not working</div> } {/* <br/> */}
                {
                  singleEmployee.shifts.length > 0
                  ? singleEmployee.shifts.map(shift => <div key={shift.id }>{shift.start}-{shift.end} {shift.date} <br/></div>)
                  : <>No shifts</>
                }
              </div>
            
          }
        </div>
      </div>
    </div>
  )
}

export default AllEmployees