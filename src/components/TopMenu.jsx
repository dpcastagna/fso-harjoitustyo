import { useEffect, useState } from "react"
import '../App.css'

const TopMenu = (props) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    setItems(props.items)
  }, [props.items])

  return (
    <div id="palikka">
      <div id="vaaka">
        {
          items.map(item => 
          <button key={item} onClick={() => {
            props.changeMenuTab(item)}}
          >
            {item}
          </button>)
        }
      </div>
    </div>
  )
}

export default TopMenu