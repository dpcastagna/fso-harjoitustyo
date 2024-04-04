import '../App.css'
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import localeData from "dayjs/plugin/localeData"
dayjs.extend(localeData)
// import weekday from "dayjs/plugin/weekday"
// dayjs.extend(weekday)
// import fi from "dayjs/locale/fi"
// dayjs.locale('fi')

const ShiftsMonth = (props) => {
  const months = dayjs.months()
  const monthsNumbers = Array.from({ length: 12 }, (_, i) => 1 + i)

  const [month, setMonth] = useState(months[dayjs().month()])
  const [year, setYear] = useState(dayjs().year())
  const years = Array.from({ length: 16 }, (_, i) => 2020 + i)
  const days = Array.from({ length: dayjs(`${year}-${month}-15`).daysInMonth() }, (_, i) => 1 + i)
  const [shifts, setShifts] = useState([])

  useEffect(() => {
    setShifts(props.shifts)
  }, [props.shifts])

  const handleMonthChange = (event) => {
    setMonth(event.target.value)
  }
  const handleYearChange = (event) => {
    setYear(event.target.value)
  }

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
        <thead>
          <tr>
            <th>------</th>
            {
              props.employees.map(emp => <th key={emp.id}>{emp.name}</th>)
            }
          </tr>
        </thead>
        <tbody>
          {
            days.map(day => {
              const monthIndex = months.indexOf(month)
              const d = new Date(year, monthIndex, day)
              const date = dayjs(d)
              return (
                <tr key={day}>
                  <td>{`${month} ${day}`}</td>
                  {
                    props.employees.map(emp => {
                      const shiftFound = shifts.find(shift => shift.employeeId.id === emp.id)
                      console.log(shiftFound)
                      return (
                        <>
                        { shiftFound === undefined
                          ? <td>Free</td>
                          : shiftFound.date.split('T')[0] === date.format().split('T')[0]
                            ? <td>{shiftFound.start}-{shiftFound.end}</td>
                            : <td>Free</td>
                        }
                        </>
                        // <td key={emp.id}>{`${date.year()}-${date.month() + 1}-${date.date()}`}</td>
                      )
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default ShiftsMonth