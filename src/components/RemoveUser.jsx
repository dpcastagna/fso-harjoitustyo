import { useState, useEffect } from "react"

const RemoveUser = (props) => {
  const [oldName, setOldName] = useState('')
  // const [newStart, setNewStart] = useState('')
  // const [newEnd, setNewEnd] = useState('')
  // const [newShiftFor, setNewShiftFor] = useState(0)
  const [employeeList, setEmployeeList] = useState([])

  useEffect(() => {
    setEmployeeList(props.users.filter(user => user.companyId === 1 && user.role === 'employee'))
  }, [props.users])

  console.log(employeeList, props.users)
  const handleNameChange = (event) => {
    setOldName(event.target.value)
  }
  // const handleStartChange = (event) => {
  //   setNewStart(event.target.value)
  // }
  // const handleEndChange = (event) => {
  //   setNewEnd(event.target.value)
  // }
  // const handleShiftChange = (event) => {
  //   setNewShiftFor(event.target.value)
  // }

  const deleteUser = (event) => {
    event.preventDefault()
    // const userObject = {
    //   name: newName,
    //   userId: props.users.length + 1,
    //   role: 'employee',
    //   companyId: 1,
    //   securityLevel: 3,
    // }
    console.log('oldname', oldName)
    props.setUsers(props.users.filter(user => user.id !== Number(oldName)))

    setOldName('')
  }
  
  return (
    <div className="formDiv">
      <form onSubmit={deleteUser}>
        Delete employee<br/>
        {/* name:
          <input
            id='name'
            type='test'
            value={newName}
            onChange={handleNameChange}
            placeholder='name'
          /> <br />
        start:
          <input
            id='start'
            type='number'
            value={newStart}
            onChange={handleStartChange}
            placeholder='8'
            min='0'
            max='23'
          /> <br />
        end:
          <input
            id='end'
            type='number'
            value={newEnd}
            onChange={handleEndChange}
            placeholder='16'
            min='0'
            max='23'
          /> <br /> */}
        employee:
          <select onChange={handleNameChange}>
            <option>Select...</option>
            {
              employeeList.map(employee => {
                // console.log(employee)
                return(
                  <option key={employee.userId} value={employee.userId}>{employee.name}</option>
                )
              }
              )
            }
          </select> <br />
        <button id='delete' type="submit">delete user</button>
      </form>
    </div>
  )
}

export default RemoveUser