import { configureStore } from '@reduxjs/toolkit'
import userReducer from './users/userSlice'
import themeReducer from './theme/themeSlice'
import { combineReducers } from '@reduxjs/toolkit'
import {persistReducer, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  version : 1
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(
    {serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },}
)
})

export const persistor = persistStore(store)