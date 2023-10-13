import { Navigate } from 'react-router-dom'

import { SignIn } from '@/components'
import { useLoginMutation } from '@/services/auth/auth.ts'

export const Login = () => {
  //TODO redirect if ME
  let errorData = null
  const [login, { isSuccess, error }] = useLoginMutation()

  if (isSuccess) return <Navigate to={'/'} />
  else if (error) {
    if ('status' in error) {
      // you can access all properties of `FetchBaseQueryError` here

      console.log(error)
      // @ts-ignore
      errorData = error.data.message
      //https://redux-toolkit.js.org/rtk-query/usage-with-typescript#type-safe-error-handling
    }
  }

  return (
    <div>
      <SignIn onSubmit={login} />
      {error && <p style={{ color: 'red' }}>{errorData}</p>}
    </div>
  )
}
