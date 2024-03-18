import '../App.css'
import { connect } from "react-redux"
import { useState } from "react"

import { setNotification } from '../reducers/notificationReducer'
import { createNew } from '../services/userService.js'

const RegisterCompany = (props) => {
  const [newName, setNewName] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [businessId, setBusinessId] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value)
  }
  const handleBusinessIdChange = (event) => {
    setBusinessId(event.target.value)
  }
  
  const addCompany = async (event) => {
    event.preventDefault()
    const userObject = {
      name: newName,
      username: newUsername,
      password: newPassword,
      role: 'boss',
      company: businessId,
      securityLevel: 5,
      working: false
    }
    
    try {
      props.setNotification(`new company '${newName}' created`, 5)
      await createNew(userObject)
      setNewName('')
      setNewUsername('')
      setNewPassword('')
      setBusinessId('')
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div id='palikka'>
      <form onSubmit={addCompany}>
        <h1>Create company account</h1>
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
        business id:
          <input
            id='businessid'
            type='test'
            value={businessId}
            onChange={handleBusinessIdChange}
            placeholder='business id'
          /> <br/>
        <button id='create' type="submit">create account</button>
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

const ConnectedRegisterCompany = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterCompany)

export default ConnectedRegisterCompany