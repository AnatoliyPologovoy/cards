import { configureStore } from '@reduxjs/toolkit'

import { baseApi } from '@/services/base-api.ts'
import { appSlice } from '@/store/app.slice.ts'
import { cardsSlice } from '@/store/cards.slice.ts'
import { decksSlice } from '@/store/decks.slice.ts'
import { emailSlice } from '@/store/email.slice.ts'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [decksSlice.name]: decksSlice.reducer,
    [emailSlice.name]: emailSlice.reducer,
    [cardsSlice.name]: cardsSlice.reducer,
    [appSlice.name]: appSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})
