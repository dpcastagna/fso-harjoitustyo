import { useState, useEffect } from 'react'
import './App.css'

import Notification from './components/Notification'
import Login from './components/Login'
import LoggedIn from './components/LoggedIn'
import RegisterCompany from './components/RegisterCompany'


const App = () => {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
    }
  }, [])

  const setWorking = (id) => {
    const userToChange = users.find(user => user.id === id)
    setUsers(users.filter(user => user.id !== id).concat({ ...userToChange, working: !userToChange.working}))
    console.log(userToChange, users)
  }

  return (
    <>
      <Notification />
      { user !== null
        ? <LoggedIn user={user} setUser={setUser} />
        : <div id="vaaka">
            <Login user={user} setUser={setUser} />
            <br/>
            or
            <RegisterCompany />
          </div>
      }
    </>
  )
}

export default App
