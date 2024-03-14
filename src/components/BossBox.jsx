import { useState, useEffect } from "react"
import '../App.css'
import AddUser from "./AddUser"
import AllEmployees from "./AllEmployees"

const BossBox = (props) => {
  console.log(props)
  return(
    <div id='palikka'>
      Jepen korjaamo<br/>
      Employees: ??? {/* {props.users.filter(user => user.role === 'employee').length} */}
      <AddUser createUser='employee' />
      <AllEmployees companyId={props.user.company} />
    </div>
  )
}

export default BossBox