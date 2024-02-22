import { connect } from "react-redux"
import { useState } from "react"
import { setNotification } from '../reducers/notificationReducer'
import '../App.css'

const AddUser = (props) => {
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addUser = (event) => {
    event.preventDefault()
    const userObject = {
      name: newName,
      role: 'employee',
      companyId: 1,
      securityLevel: 3,
      id: Math.round(Math.random() * 1000000),
      working: false
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
        <button id='create' type="submit">add employee</button>
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