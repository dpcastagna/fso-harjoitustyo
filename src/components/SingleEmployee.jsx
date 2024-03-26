import { useEffect, useState } from "react"


const SingleEmployee = (props) => {
  const [employee, setEmployee] = useState(null)
  const [employees, setEmployees] = useState([])
  
  useEffect(() => {
    setEmployees(props.employees)
  }, [props.employees])

  return (
    <div id="singleEmpBox">
        <div id="singleEmpLeft">
          {
            employees.map(emp => {
              return (
                <button key={emp.id} onClick={() => {setEmployee(emp)}}>{emp.name}</button>
              )
            })
          }
        </div>
        <div id="singleEmpRight">
          {
            employee === null
            ? <>Select employee</>
            : <div key={employee.id} id="palikka">
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
          }
        </div>
      </div>
  )
}

export default SingleEmployee