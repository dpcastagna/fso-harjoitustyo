import { useState, useEffect } from "react"
import '../App.css'

const BossBox = (props) => {
  
  return(
    <div id='palikka'>
      Jepen korjaamo<br/>
      Employees: {props.users.filter(user => user.role === 'employee').length}
    </div>
  )
}

export default BossBox