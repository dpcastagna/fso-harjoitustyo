

const AdminBox = (props) => {

  return(
    <>
      Companies: {props.companies.length}<br/>
      Users: {props.users.length}<br/>
      Shifts: {props.shifts.length}
    </>
  )
}

export default AdminBox