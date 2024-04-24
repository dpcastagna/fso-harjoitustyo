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
import TopMenu from "./TopMenu"
import Messages from "./Messages"

const BossBox = (props) => {
  const [employees, setEmployees] = useState([])
  const [shifts, setShifts] = useState([])
  const menuItems = ['Month', 'Messages', 'All employees', 'Add/remove employee/shift', 'All tabs']
  const [menuTab, setMenuTab] = useState(menuItems[0])

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
    const employeeToAddShift = employees.find(employee => employee.id === obj.employeeId)
    employeeToAddShift.shifts = employeeToAddShift.shifts.concat(obj)
    
    setShifts(shifts.concat({...obj, employeeId: { name: employeeToAddShift.name, id: employeeToAddShift.id }}))
    
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
    
    employeeToDeleteShift.shifts = employeeToDeleteShift.shifts.filter(shift => shift.id !== id)
    
    const otherEmployees = employees.filter(employee => employee.id !== employeeToDeleteShiftId)
    
    setEmployees(otherEmployees.concat(employeeToDeleteShift).sort((a, b) => {  //sorting employees to prevent their order changing
      if(a.id < b.id) {
        return -1
      }
      return 1
    }))
  }

  const changeMenuTab = (tabName) => {
    setMenuTab(tabName)
  }

  return (
    <div id='palikka'>
      Company name: {props.user.name} <br/>
      Employees: {employees.length}
      <TopMenu items={menuItems} changeMenuTab={changeMenuTab} currentTab={menuTab} />
      {
        menuTab === 'Month'
        ? <ShiftsMonth employees={employees} shifts={shifts} />
        : menuTab === 'Messages'
          ? <Messages user={props.user} employees={employees} />
          : menuTab === 'All employees'
            ? <AllEmployees companyId={props.user.company} employees={employees} shifts={shifts} />
            : menuTab === 'Add/remove employee/shift'
              ? <> 
                  <div id="vaaka" >
                    <AddUser role='employee' company={props.user.company} addEmployee={addEmployee} />
                    <RemoveUser employees={employees} deleteEmployee={deleteEmployee} />
                    <AddShift company={props.user.company} employees={employees} addShift={addShift} />
                  </div>
                  <SingleEmployee employees={employees} deleteShift={deleteShift} />
                </>
              : menuTab === 'All tabs'
                ? <>
                    <div id="vaaka" >
                      <AddUser role='employee' company={props.user.company} addEmployee={addEmployee} />
                      <RemoveUser employees={employees} deleteEmployee={deleteEmployee} />
                      <AddShift company={props.user.company} employees={employees} addShift={addShift} />
                    </div>
                    <AllEmployees companyId={props.user.company} employees={employees} shifts={shifts} />
                    <SingleEmployee employees={employees} deleteShift={deleteShift} />
                    <ShiftsMonth employees={employees} shifts={shifts} />
                    <Messages user={props.user} employees={employees} />
                  </>
                : null
      }
    </div>
  )
}

export default BossBox