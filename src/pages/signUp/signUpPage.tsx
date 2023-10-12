import { Navigate } from 'react-router-dom'

import { SignUp } from '@/components'
import { useSignUpMutation } from '@/services/auth/auth.ts'

export const SignUpPage = () => {
  const [signUp, { isSuccess, error }] = useSignUpMutation()

  if (isSuccess) {
    return <Navigate to={'/'} />
  } else if (error) {
    if ('status' in error) {
      // you can access all properties of `FetchBaseQueryError` here

      console.log(error.data)
      //TODO display errors on page (form)
    }
  }

  return (
    <div>
      <SignUp onSubmit={signUp} />
    </div>
  )
}
