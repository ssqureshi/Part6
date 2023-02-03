import { useDispatch } from 'react-redux'
import { createAnectode } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'


const AnectodeForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = '' 
        dispatch(createAnectode(content))  
        dispatch(createNotification(`New anecdote added"${content}"`, 5))
    }


    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </>
    )
}
export default AnectodeForm