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
          items.map(item => {
            return (
              item === props.currentTab
              ? <div key={item}>
                  <button 
                    onClick={() => {
                      props.changeMenuTab(item)}
                    }
                    id="palikka"
                  >
                    {item}
                  </button>
                </div>
              : <div key={item}>
                  <button 
                    onClick={() => {
                      props.changeMenuTab(item)}
                    }
                  >
                    {item}
                  </button>
                </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default TopMenu