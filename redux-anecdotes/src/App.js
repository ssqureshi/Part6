import { useEffect } from 'react'
import AnectodeList from './components/AnectodeList'
import AnectodeForm from './components/AnectodeForm'
import AnectodeFilter from './components/AnectodeFilter'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnectodeFilter />
      <AnectodeList />
      <AnectodeForm />
    </div>
  )
}

export default App