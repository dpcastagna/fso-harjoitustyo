import { useState, useEffect } from "react"
import { removeOld } from "../services/userService"

const RemoveUser = (props) => {
  const [oldName, setOldName] = useState('')
  const [employeeList, setEmployeeList] = useState([])

  useEffect(() => {
    setEmployeeList(props.employees)
  }, [props.employees])

  const handleNameChange = (event) => {
    setOldName(event.target.value)
  }
  
  const deleteUser = async (event) => {
    event.preventDefault()
    console.log(oldName)
    try {
      await removeOld(oldName)
      props.deleteEmployee(oldName)
      setOldName('')
    } catch (error) {
      console.log(error)
    }
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