import '../App.css'
import { useState } from "react"
import dayjs from "dayjs"
import localeData from "dayjs/plugin/localeData"
// import weekday from "dayjs/plugin/weekday"
dayjs.extend(localeData)
// dayjs.extend(weekday)
// import fi from "dayjs/locale/fi"
// dayjs.locale('fi')

const ShiftsMonth = (props) => {
  const [month, setMonth] = useState(0)
  const [year, setYear] = useState(2024)
  const months = dayjs.months()
  const years = Array.from({ length: 11 }, (_, i) => /* new Date().getFullYear() */ 2020 + i)
  const days = dayjs(`${year}-${month}-15`).daysInMonth()


  // const daysOfMonth = (y, m) => {
  //   return new Date(y, m, 0).getDate()
  // }

  const handleMonthChange = (event) => {
    setMonth(event.target.value)
  }
  const handleYearChange = (event) => {
    setYear(event.target.value)
  }

  console.log(month, year, days, years, dayjs(`${year}-${month}-15`))
  
  return (
    <div id="palikka">
      <select 
        name="months"
        id="monthSelect"
        defaultValue={months[dayjs().month()]}
        onChange={handleMonthChange}
      >
        {
          months.map(month => {
            return (
              <option key={month} value={month} >{month}</option>
            )
          })
        }
      </select>
      <select 
        name="years"
        id="yearSelect"
        defaultValue={dayjs().year()}
        onChange={handleYearChange}
      >
        {
          years.map(year => {
            return (
              <option key={year} value={year} >{year}</option>
            )
          })
        }
      </select>
      <table id="monthTable">
        <th>Employee</th>
        {
          <tr>
            <td>{days}</td>
          </tr>
        }
      </table>
    </div>
  )
}

export default ShiftsMonth