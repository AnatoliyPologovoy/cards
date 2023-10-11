import { LoginArgs, ProfileResponse } from '@/services/auth/auth.types.ts'
import { baseApi } from '@/services/base-api'

const authService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMe: builder.query<
      ProfileResponse & {
        success: boolean
      },
      void
    >({
      // queryFn: async (_args, _api, _extraOptions, baseQuery) => {
      //   const response: QueryReturnValue<any, FetchBaseQueryError, {}> = await baseQuery({
      //     url: '/v1/auth/me',
      //     method: 'GET',
      //   })
      //
      //   const isSuccess = !('error' in response)
      //
      //   return {
      //     data: { ...response.data, success: isSuccess },
      //   }
      // },
      query: () => ({
        url: '/v1/auth/me',
      }),
    }),
    login: builder.query<any, LoginArgs>({
      query: body => ({
        url: 'v1/auth/login',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useGetMeQuery } = authService
