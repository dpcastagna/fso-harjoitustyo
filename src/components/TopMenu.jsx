import { useEffect, useState } from "react"
import '../App.css'

const TopMenu = (props) => {
  const [items, setItems] = useState(null)

  useEffect(() => {
    setItems(props.items)
  }, [props.items])

  // if (user === null) {
  //   return <div id='palikka'>Choose a user!</div>
  // }

  return (
    <div id="palikka">
      <div id="vaaka">
        {
          props.items.map(item => <button key={item}>{item}</button>)
        }
      </div>
    </div>
  )
}

export default TopMenu