

const ShiftsMonth = (props) => {


  const daysOfMonth = (y, m) => {
    return new Date(y, m, 0).getDate()
  }

  console.log(daysOfMonth(2024, 2))

  return (
    <>
      2024 Mar {daysOfMonth(2024, 3)} <br/>
      2024 Feb {daysOfMonth(2024, 2)}
    </>
  )
}

export default ShiftsMonth