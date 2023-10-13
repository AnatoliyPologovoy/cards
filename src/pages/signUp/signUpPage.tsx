import { Navigate } from 'react-router-dom'

import { SignUp } from '@/components'
import { useSignUpMutation } from '@/services/auth/auth.ts'

export const SignUpPage = () => {
  const [signUp, { isSuccess, error }] = useSignUpMutation()

  let errorData = null

  if (isSuccess) {
    return <Navigate to={'/login'} />
  } else if (error) {
    if ('status' in error) {
      // you can access all properties of `FetchBaseQueryError` here

      console.log(error.data)
      // @ts-ignore
      errorData = error.data.message
      //https://redux-toolkit.js.org/rtk-query/usage-with-typescript#type-safe-error-handling
    }
  }

  return (
    <div>
      <SignUp onSubmit={signUp} />
      {error && <p style={{ color: 'red' }}>{errorData}</p>}
    </div>
  )
}
