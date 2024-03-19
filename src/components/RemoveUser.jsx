import { useState, useEffect } from "react"

const RemoveUser = (props) => {
  const [oldName, setOldName] = useState('')
  const [employeeList, setEmployeeList] = useState([])

  useEffect(() => {
    setEmployeeList(props.employees)//.filter(user => user.companyId === 1 && user.role === 'employee'))
  }, [props.employees])

  const handleNameChange = (event) => {
    setOldName(event.target.value)
  }
  
  const deleteUser = (event) => {
    event.preventDefault()
    console.log(oldName)
    props.deleteEmployee(oldName)
    // props.setUsers(props.users.filter(user => {
    //   // console.log(user.userId, props.users)
    //   return user.id !== Number(oldName)
    // }))

    setOldName('')
  }
  
  return (
    <div id='palikka'>
      <form onSubmit={deleteUser}>
        Delete employee<br/>
        
        employee:
          <select onChange={handleNameChange}>
            <option>Select...</option>
            {
              employeeList.map(employee => {
                // console.log(employee)
                return(
                  <option key={employee.id} value={employee.id}>{employee.name}</option>
                )
              }
              )
            }
          </select> <br />
        <button id='delete' type="submit">delete employee</button>
      </form>
    </div>
  )
}

export default RemoveUser