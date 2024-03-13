import { useState, useEffect } from "react"
import '../App.css'
import AddUser from "./AddUser"

const BossBox = (props) => {
  
  return(
    <div id='palikka'>
      Jepen korjaamo<br/>
      Employees: ??? {/* {props.users.filter(user => user.role === 'employee').length} */}
      <AddUser createUser='employee' />
    </div>
  )
}

export default BossBox