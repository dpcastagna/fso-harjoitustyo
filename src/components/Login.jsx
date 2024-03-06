import { useState, useEffect } from 'react'
import loginService from '../services/loginService.js'
import { getAll } from '../services/userService'
import AllShifts from './AllShifts.jsx'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [employeeList, setEmployeeList] = useState([])

  useEffect(() => {
    getEmployees()
    setUser(props.user)
  }, [])

  const getEmployees = async () => {
    setEmployeeList(await getAll())
    
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      console.log(user)
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      props.setUser(user)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong credentials')
      // setErrorMessage('Wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
    }
  }
  console.log(props.user, employeeList)
  if (user !== null) {
    return (
      <>
        Current user: {user.name} &nbsp;
        <button onClick={(event) => {
          event.preventDefault()
          window.localStorage.removeItem('loggedInUser')
          setUser(null)
        }}>
          logout
        </button>
        <AllShifts employees={employeeList} />
      </>
    )
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login
