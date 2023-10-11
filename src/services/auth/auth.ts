import { baseApi } from '@/services/base-api.ts'

const authService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMe: builder.query<any, void>({
      queryFn: async (_args, _api, _extraOptions, baseQuery) => {
        const response = await baseQuery({
          url: '/v1/auth/me',
          method: 'GET',
        })

        return { data: response.data }
      },
    }),
  }),
})

export const { useGetMeQuery } = authService
