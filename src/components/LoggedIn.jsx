import AdminBox from "./AdminBox"
import BossBox from "./BossBox"
import UserBox from "./UserBox"

const LoggedIn = (props) => {

  if (!props.user) {
    return <>Loading...</>
  }
  
  return (
    <>
      Current user: {props.user.name} &nbsp;
      <button onClick={(event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedInUser')
        props.setUser(null)
      }}>
        logout
      </button>
      {/* <AllShifts employees={employeeList} /> */}
          
    { props.user.role === 'admin'
      ? <AdminBox user={props.user} />
      : props.user.role === 'boss'
        ? <BossBox user={props.user} />
        : <UserBox user={props.user} shifts={[]} />
    }
    </>
  )
}

export default LoggedIn