import { useEffect, useState } from "react"
import '../App.css'

import TopMenu from "./TopMenu"
import Messages from "./Messages"

const UserBox = (props) => {
  const [shifts, setShifts] = useState([])
  const menuItems = ['My shifts', 'Messages']
  const [menuTab, setMenuTab] = useState(menuItems[0])

  // useEffect(() => {
  //   setShifts(props.shifts.filter(shift => {
  //     // console.log(shift)
  //     return(
  //       shift.employeeId === props.userId)
  //     }
  //   )
  //   )
  // }, [props])

  const changeMenuTab = (tabName) => {
    setMenuTab(tabName)
  }
  console.log(props, menuTab)
  return(
    <div id='palikka'>
      <TopMenu items={menuItems} changeMenuTab={changeMenuTab} currentTab={menuTab} />
      {
        menuTab === menuItems[0]
        ? <>shifts</>
        : <Messages user={props.user} employees={[]} />
      }
      {/* <div>
        Next shifts:<br/>
        {
          shifts.map((shift) => {
            return <div key={shift.shiftId}>{shift.start}-{shift.end} {shift.date}<br/></div> 
          })
        }
      </div> */}
    </div>
  )
}

export default UserBox