import { useState, useEffect } from "react"
import '../App.css'
import AllEmployees from "./AllEmployees"
import AddUser from "./AddUser"
import RemoveUser from "./RemoveUser"
import { getMyEmployees } from "../services/userService"
import { getMyCompanyShifts } from "../services/shiftService"

const BossBox = (props) => {
  const [employees, setEmployees] = useState([])
  const [shifts, setShifts] = useState([])

  useEffect(() => {
    getEmployees()
    getShifts()
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

  const getShifts = async () => {
    setShifts(await getMyCompanyShifts(props.user.company))
  }
  console.log(shifts)

  return(
    <div id='palikka'>
      Jepen korjaamo<br/>
      Employees: {employees.length}
      <div id="vaaka" >
        <AddUser role='employee' company={props.user.company} addEmployee={addEmployee} />
        <RemoveUser employees={employees} deleteEmployee={deleteEmployee} />
      </div>
      <AllEmployees companyId={props.user.company} employees={employees} />
    </div>
  )
}

export default BossBox