import '../App.css'
import { connect } from "react-redux"
import { useState } from "react"

import { setNotification } from '../reducers/notificationReducer'
import { createNew } from '../services/userService.js'

const AddUser = (props) => {
  const [newName, setNewName] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value)
  }
  
  const addUser = async (event) => {
    event.preventDefault()
    const userObject = {
      name: newName,
      username: newUsername,
      password: newPassword,
      role: props.role,
      company: props.company,
      shifts: [],
      messages: [],
      securityLevel: 1,
      working: false
    }
    // props.setUsers(props.users.concat(userObject))
    try {
      const newUser = await createNew(userObject)
      await props.addEmployee(newUser)
      props.setNotification(`new user '${newName}' created`, 5)
      setNewName('')
      setNewUsername('')
      setNewPassword('')
    } catch (e) {
      console.log(e)
    }
  }

  const checkValid = () => {
    return newName.length > 4 && newUsername.length > 4 && newPassword.length > 2
    ? <button id='createUser' type="submit">add employee</button>
    : <button id='createUser' type="submit" disabled>add employee</button>
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
          /> <br/>
        username:
          <input
            id='username'
            type='test'
            value={newUsername}
            onChange={handleUsernameChange}
            placeholder='username'
          /> <br/>
        password:
          <input
            id='password'
            type='password'
            value={newPassword}
            onChange={handlePasswordChange}
            placeholder='password'
          /> <br/>
        { checkValid() }
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

const ConnectedAddUser = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUser)

export default ConnectedAddUser