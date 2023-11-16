import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReAuth } from '@/services/base-query-with-reauth.ts'

export const baseApi = createApi({
  tagTypes: ['Me', 'Decks', 'Deck', 'Cards'],
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
})
