import { useState, useEffect } from "react"
import '../App.css'
import AddUser from "./AddUser"
import AllEmployees from "./AllEmployees"
import { getMyEmployees } from "../services/userService"
import RemoveUser from "./RemoveUser"

const BossBox = (props) => {
  const [employees, setEmployees] = useState([])
  console.log(props)

  useEffect(() => {
    getEmployees()
  }, [])
  const getEmployees = async () => {
    setEmployees(await getMyEmployees(props.user.company))
  }

  const addEmployee = (obj) => {
    setEmployees(employees.concat(obj))
  }
  const deleteEmployee = (id) => {
    setEmployees(employees.filter(employee => employee.id !== id))
  }
  console.log(employees)

  return(
    <div id='palikka'>
      Jepen korjaamo<br/>
      Employees: {employees.length}
      <AddUser role='employee' company={props.user.company} addEmployee={addEmployee} />
      <RemoveUser employees={employees} deleteEmployee={deleteEmployee} />
      <AllEmployees companyId={props.user.company} employees={employees} />
    </div>
  )
}

export default BossBox