import { useState, useEffect } from "react"
import '../App.css'

import { getMyEmployees } from "../services/userService"
import { getMyCompanyShifts } from "../services/shiftService"

import AllEmployees from "./AllEmployees"
import AddUser from "./AddUser"
import RemoveUser from "./RemoveUser"
import AddShift from "./AddShift"

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
  const addShift = (obj) => {
    setShifts(shifts.concat(obj))
  }

  return(
    <div id='palikka'>
      Jepen korjaamo<br/>
      Employees: {employees.length}
      <div id="vaaka" >
        <AddUser role='employee' company={props.user.company} addEmployee={addEmployee} />
        <RemoveUser employees={employees} deleteEmployee={deleteEmployee} />
        <AddShift company={props.user.company} employees={employees} addShift={addShift} />
      </div>
      <AllEmployees companyId={props.user.company} employees={employees} shifts={shifts} />
    </div>
  )
}

export default BossBox