import { useState, useEffect } from "react"
import { removeOld } from "../services/userService"

const RemoveUser = (props) => {
  const [confirmation, setConfirmation] = useState('')
  // const [employeeList, setEmployeeList] = useState([])

  // useEffect(() => {
  //   setEmployeeList(props.employees)
  // }, [props.employees])

  const handleNameChange = (event) => {
    setConfirmation(event.target.value)
  }
  
  const deleteUser = async (event) => {
    event.preventDefault()
    try {
      await removeOld(props.employee.id)
      props.deleteEmployee(props.employee.id)
      setEmployeeName('')
    } catch (error) {
      console.log(error)
    }
  }
  console.log(props.employee.id)
  return (
    <div id='palikka'>
      <form onSubmit={deleteUser}>
        Delete this employee?<br/>
        
        <input
          id='confirmation'
          type='text'
          value={confirmation}
          onChange={handleNameChange}
          placeholder='yes'
        /> <br/>
        {/* <select onChange={handleNameChange}>
          <option>Select...</option>
          {
            employeeList.map(employee => {
              
              return(
                <option key={employee.id} value={employee.id}>{employee.name}</option>
              )
            }
            )
          }
        </select> <br/> */}
        {
          confirmation.toLowerCase() === 'yes'
          ? <button id='delete' type="submit">delete employee</button>
          : <button id='delete' type="submit" disabled>delete employee</button>
        }
        
      </form>
    </div>
  )
}

export default RemoveUser