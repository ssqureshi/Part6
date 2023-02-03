import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAnecdotes, updatedAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'



const App = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const updateAnecdoteMutation  = useMutation(updatedAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const handleVote = (anecdote) => {
    dispatch({ type: "VOTE", payload: anecdote})
    setTimeout(() => {
      dispatch({type: "CLEAR"})
    }, 5000)
    updateAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
  })
  }


  const result = useQuery(
    'anecdotes', getAnecdotes, 
    {
      retry: 1
    }
  )

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not avaliable due to problems in server</div>
  }
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
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
    </div>
  )
}

export default App
