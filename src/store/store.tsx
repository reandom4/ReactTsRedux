import {combineReducers, configureStore } from '@reduxjs/toolkit'
import { reducer as favoriteReducer } from './favorites/favorites.slise'
// ...

const reducers = combineReducers({
    favorites:favoriteReducer,
    })

export const store = configureStore({
  reducer: reducers

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch