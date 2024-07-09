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