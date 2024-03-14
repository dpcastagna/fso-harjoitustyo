import '../App.css'
import { useEffect, useState } from "react"
import { getMyEmployees } from "../services/userService"

const AllEmployees = (props) => {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    getEmployees()
  }, [])
  const getEmployees = async () => {
    setEmployees(await getMyEmployees(props.companyId))
  }
  console.log(employees)

  return (
    <div id="vaaka">
      {
        employees.map(employee => {
          return (
            <div key={employee.id} id="palikka">
              Name: {employee.name}<br/>
              Working: {String(employee.working)}<br/>
              Shifts: {employee.shifts.length}<br/>
              Messages: {employee.messages.length}<br/>
              Securitylevel: {employee.securityLevel}<br/>
            </div>
          )
        })
      }
    </div>
  )
}

export default AllEmployees