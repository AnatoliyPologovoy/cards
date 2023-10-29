import { configureStore } from '@reduxjs/toolkit'

import { baseApi } from '@/services/base-api.ts'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { emailSlice } from '@/store/email.slice.ts'
import { friendsPackSlice } from '@/store/friends-pack.slice.ts'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [decksSlice.name]: decksSlice.reducer,
    [emailSlice.name]: emailSlice.reducer,
    [friendsPackSlice.name]: friendsPackSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})
