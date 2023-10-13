import { createApi } from '@reduxjs/toolkit/query/react'

import { DecksResponse } from '@/services/api-types.ts'
import { baseQueryWithReAuth } from '@/services/base-query-re-authorization.ts'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReAuth,
  endpoints: builder => {
    return {
      getDecks: builder.query<DecksResponse, void>({
        query: () => `v1/decks`,
        providesTags: ['DECKS'],
      }),
    }
  },
  tagTypes: ['ME', 'DECKS'],
})

export const { useGetDecksQuery } = baseApi

// baseQuery: fetchBaseQuery({
//   baseUrl: 'https://api.flashcards.andrii.es',
//   credentials: 'include',
//   prepareHeaders: headers => {
//     headers.append('x-auth-skip', 'true')
//   },
// }),
