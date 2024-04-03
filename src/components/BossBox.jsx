import { useState, useEffect } from "react"
import '../App.css'

import { getMyEmployees } from "../services/userService"
import { getMyCompanyShifts } from "../services/shiftService"

import AllEmployees from "./AllEmployees"
import AddUser from "./AddUser"
import RemoveUser from "./RemoveUser"
import AddShift from "./AddShift"
import SingleEmployee from "./SingleEmployee"
import ShiftsMonth from "./ShiftsMonth"

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
    const employeeToAddShift = employees.find(employee => employee.id === obj.employeeId)
    employeeToAddShift.shifts = employeeToAddShift.shifts.concat(obj)
    
    const otherEmployees = employees.filter(employee => employee.id !== obj.employeeId)
    
    setEmployees(otherEmployees.concat(employeeToAddShift).sort((a, b) => {  //sorting employees to prevent their order changing
      if(a.id < b.id) {
        return -1
      }
      return 1
    }))
  }

  const deleteShift = (id) => {
    const employeeToDeleteShiftId = shifts.find(shift => shift.id === id).employeeId.id
    const employeeToDeleteShift = employees.find(employee => employee.id === employeeToDeleteShiftId)
    setShifts(shifts.filter(shift => shift.id !== id))
    // console.log('id', id, 'emp id', employeeToDeleteShift, shifts)
    employeeToDeleteShift.shifts = employeeToDeleteShift.shifts.filter(shift => shift.id !== id)
    // console.log('employeeToDeleteShift', employeeToDeleteShift)
    const otherEmployees = employees.filter(employee => employee.id !== employeeToDeleteShiftId)
    // console.log('otherEmployees', otherEmployees)
    setEmployees(otherEmployees.concat(employeeToDeleteShift).sort((a, b) => {  //sorting employees to prevent their order changing
      if(a.id < b.id) {
        return -1
      }
      return 1
    }))
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
      <SingleEmployee employees={employees} deleteShift={deleteShift} />
      <ShiftsMonth employees={employees} />
    </div>
  )
}

export default BossBox