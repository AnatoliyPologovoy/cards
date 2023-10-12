import { Navigate } from 'react-router-dom'

import { SignIn } from '@/components'
import { useLoginMutation } from '@/services/auth/auth.ts'

export const Login = () => {
  const [login, { isSuccess }] = useLoginMutation()

  if (isSuccess) return <Navigate to={'/'} />

  return (
    <div>
      <SignIn onSubmit={login} />
    </div>
  )
}
