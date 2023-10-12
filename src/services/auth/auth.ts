import {
  LoginArgs,
  LoginResponse,
  ProfileResponse,
  SignUpArgs,
  SignUpResponse,
} from '@/services/auth/auth.types.ts'
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
    login: builder.mutation<LoginResponse, LoginArgs>({
      query: body => ({
        url: 'v1/auth/login',
        method: 'POST',
        body,
      }),
    }),
    signUp: builder.mutation<SignUpResponse, SignUpArgs>({
      query: body => ({
        url: 'v1/auth/sign-up',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useGetMeQuery, useSignUpMutation, useLoginMutation } = authService
