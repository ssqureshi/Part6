import { useDispatch } from "react-redux"
import { filterChange } from '../reducers/filterReducer'

const AnecdoteFilter = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
    event.preventDefault()
    dispatch(filterChange(event.target.value.toLowerCase()))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default AnecdoteFilter