import { useEffect, useState } from "react"
import '../App.css'

const TopBar = (props) => {
  const [user, setUser] = useState('')

  useEffect(() => {
    setUser(props.user)
  }, [props])
  // console.log(user)

  if (user === '') {
    return <div id='palikka'>Choose a user!</div>
  }

  return (
    <div id='palikka'>
      {user} logged in
    </div>
  )
}

export default TopBar