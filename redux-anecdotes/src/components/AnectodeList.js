import { addVote } from './../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'


const AnectodeList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === '') {
      return anecdotes
    }
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
  })

  const handleVote = (anecdote) => {
    dispatch(addVote(anecdote))
    dispatch(createNotification(`you voted for "${anecdote.content}"`, 5))
  }


  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}
export default AnectodeList