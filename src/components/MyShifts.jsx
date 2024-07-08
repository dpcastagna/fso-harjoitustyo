import { useEffect, useState } from "react"

import { getMyShifts } from "../services/shiftService"

const MyShifts = (props) => {
  const [shifts, setShifts] = useState([])

  useEffect(() => {
    const getShifts = async () => {
      await setShifts[getMyShifts()]
    }
    getShifts()
  })

  console.log(props, shifts)
  return (
    <>
      {
        shifts.map(shift => {
          return (
            <>
              {shift.date} {shift.start} - {shift.end}
            </>
          )
        })
      }
    </>
  )
}

export default MyShifts