import { useMutation, useQueryClient } from "react-query"
import { useNotificationDispatch } from "../NotificationContext"
import { createAnecdote } from "../requests"

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0},{
      onError: () => {
        dispatch({type: "ERROR"})
        setTimeout(() => {
          dispatch({type: "CLEAR"})
        }, 5000)
      }
    })
    dispatch({ type: "ADDED", payload: content})
    setTimeout(() => {
      dispatch({type: "CLEAR"})
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
