import { useEffect, useState } from "react"

import { getMyShifts } from "../services/shiftService"

const MyShifts = (props) => {
  const [shifts, setShifts] = useState([])

  useEffect(() => {
    setShifts[getMyShifts()]
  })

  console.log(props, shifts)
  return (
    <>
      jee shifts
    </>
  )
}

export default MyShifts