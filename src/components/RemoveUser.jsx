import { useState, useEffect } from "react"

const RemoveUser = (props) => {
  const [oldName, setOldName] = useState('')
  const [employeeList, setEmployeeList] = useState([])

  useEffect(() => {
    setEmployeeList(props.users.filter(user => user.companyId === 1 && user.role === 'employee'))
  }, [props.users])

  const handleNameChange = (event) => {
    setOldName(event.target.value)
  }
  
  const deleteUser = (event) => {
    event.preventDefault()
    
    props.setUsers(props.users.filter(user => {
      // console.log(user.userId, props.users)
      return user.id !== Number(oldName)
    }))

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