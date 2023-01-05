import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit"
import { User } from "../gql/graphql"

export type ReduxUser = {
    username: string | null,
    email: string | null,
}

export const counterSlice = createSlice({
    name: 'user',
    initialState: {
        email: localStorage.getItem("email"),
        username: localStorage.getItem("username"),
    },
    reducers: {
      setEmail: (state,{payload}) => {
        state.email = payload
      },
      setUsername: (state,{payload}) => {
        state.username = payload
      },
      setUser: (state,{payload: {username,email}}) => {
        state.username = username
        state.email = email
      },
      clearUser: state => {
        state.username = null 
        state.email = null
      },
    },
  })

export const {setEmail, setUser, setUsername, clearUser} = counterSlice.actions

export const saveUserState = (user: ReduxUser): void => {
    if(user.email)
        localStorage.setItem("email",user.email)
    else
        localStorage.removeItem("email")

    if(user.username)
        localStorage.setItem("username",user.username)
    else
        localStorage.removeItem("username")
}

const rootReducer = combineReducers({
    user: counterSlice.reducer
})

const store = configureStore({
    reducer: rootReducer
})

store.subscribe(() => saveUserState(store.getState().user))

export type RootReducer = ReturnType<typeof rootReducer>

export default store