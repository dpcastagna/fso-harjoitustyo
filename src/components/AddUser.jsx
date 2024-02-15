import { connect } from "react-redux"
import { useState, useEffect } from "react"
import { setNotification } from '../reducers/notificationReducer'
import '../App.css'

const AddUser = (props) => {
  const [newName, setNewName] = useState('')
  // const [newStart, setNewStart] = useState('')
  // const [newEnd, setNewEnd] = useState('')
  // const [newShiftFor, setNewShiftFor] = useState(0)
  // const [employeeList, setEmployeeList] = useState([])

  // useEffect(() => {
  //   setEmployeeList(props.users.filter(user => user.companyId === 1 && user.role === 'employee'))
  // }, [props.users])

  // console.log(employeeList, props.users)
  const handleNameChange = (event) => {
    setNewName(event.target.value)
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

  const addUser = (event) => {
    event.preventDefault()
    const userObject = {
      name: newName,
      userId: props.users.length + 1,
      role: 'employee',
      companyId: 1,
      securityLevel: 3,
    }
    props.setUsers(props.users.concat(userObject))
    props.setNotification(`new user '${newName}' created`, 5)

    setNewName('')
  }
  
  return (
    <div id='palikka'>
      <form onSubmit={addUser}>
        New employee<br/>
        name:
          <input
            id='name'
            type='test'
            value={newName}
            onChange={handleNameChange}
            placeholder='name'
          /> <br />
        <button id='create' type="submit">add user</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = {
  setNotification,
}

const ConnectedAddUser= connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUser)

export default ConnectedAddUser
// export default AddUser