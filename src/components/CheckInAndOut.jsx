import { useEffect, useState } from 'react'
import '../App.css'

const CheckInAndOut = (props) => {
  const [user, setUser] = useState({})
  const otherUsers = props.users.filter(user => user.id !== props.userId)
  

  useEffect(() => {
    setUser(props.users.find(user => user.id === props.userId))
  },[props.userId])

  // console.log(user, otherUsers)

  return (
    <>
    {
      user.working
      ? <div id='palikka' >
          You are working! <br />
          <button style={{margin:5}} onClick={(e) => {
            e.preventDefault() 
            setUser({ ...user, working: !user.working })
            // props.setUsers(props.users.filter(user => user.userId !== props.userId).concat(user))
            props.setWorking(user.id)
          }
          }>
            Leave work
        </button>
        </div>
      : <div id='palikka' >
          You are not working! <br />
          <button style={{margin:5}} onClick={(e) => {
            e.preventDefault() 
            setUser({ ...user, working: !user.working })
            // console.log(user)
            props.setUsers([...otherUsers, user])
            // console.log(props.users)
            props.setWorking(user.id)
          }
          }>
            Start work
        </button>
        </div>
    }
    </>
  )
}

export default CheckInAndOut