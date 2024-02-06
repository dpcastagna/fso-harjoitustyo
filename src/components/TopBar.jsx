import { useEffect, useState } from "react"

const TopBar = (props) => {
  const [user, setUser] = useState('')

  useEffect(() => {
    setUser(props.user)
  }, [props])
  console.log(user)

  if (user === '') {
    return <>Choose a user!</>
  }

  return (
    <>
      {user} logged in
    </>
  )
}

export default TopBar