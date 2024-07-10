import { useEffect, useState } from "react"

import { getMyShifts } from "../services/shiftService"

const MyShifts = (props) => {
  const [shifts, setShifts] = useState([])

  useEffect(() => {
    const getShifts = async () => {
      const myShifts = await getMyShifts()
      setShifts(myShifts)
    }

    getShifts()
  }, [props.user])

  return (
    <>
      {
        shifts.map(shift => {
          return (
            <div key={shift.id}>
              {shift.startDate} {shift.startTime} - {shift.endTime}
            </div>
          )
        })
      }
    </>
  )
}

export default MyShifts