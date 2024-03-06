import { useEffect, useState } from "react"
import '../App.css'

const TopBar = (props) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(props.user)
  }, [props])
  // console.log(user)

  if (user === null) {
    return <div id='palikka'>Choose a user!</div>
  }

  return (
    <div id='palikka'>
      {user.name} logged in as {user.role}
    </div>
  )
}

export default TopBar