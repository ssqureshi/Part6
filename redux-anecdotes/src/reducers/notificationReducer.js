import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      state = action.payload
      return state
    },
    removeNotification(state) {
      state = null
      return state
    }
  }
})

export const { setNotification, removeNotification } = notificationSlice.actions


export const createNotification = (message, delay) => {
  return async dispatch => {
    dispatch(setNotification(message))

    setTimeout(() => {
      dispatch(removeNotification())
    }, delay*1000)

  }
}

export default notificationSlice.reducer