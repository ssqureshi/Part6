import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnectode(state, action) {
      const votedAnecdote = action.payload
      const updatedAnecdotes = state.map(anecdote =>
        anecdote.id !== votedAnecdote.id ? anecdote : votedAnecdote
      )
      return updatedAnecdotes.sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
}
})
export const { voteAnectode, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
    dispatch(setAnecdotes(sortedAnecdotes))
  }
}

export const createAnectode = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = anecdote => {
  return async dispatch => {
    const upvotedAnectode = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const voteAnecdote = await anecdoteService.update(upvotedAnectode)
    dispatch(voteAnectode(voteAnecdote))
  }
}

export default anecdoteSlice.reducer