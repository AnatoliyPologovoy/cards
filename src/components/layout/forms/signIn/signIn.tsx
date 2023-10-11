import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { clsx } from 'clsx'

import { Button, Card, TextField, Typography } from '../../../ui'
import { ControlledCheckbox } from '../../../ui/checkbox/ControlledCheckbox.tsx'
import cs from '../forms.module.scss'

import s from './signIn.module.scss'

import { signInSchema } from '@/common/utils'
import { FormPropsType, SignInType } from '@/components'

export const SignIn = ({ onSubmit }: FormPropsType<SignInType>) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
  } = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
  })

  return (
    <Card className={cs.formWrapper}>
      <form className={cs.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant={'large'} className={cs.header}>
          Sign In
        </Typography>

        <TextField
          {...register('email')}
          type={'email'}
          className={cs.txf}
          label={'Email'}
          placeholder={'Email'}
          error={errors.email}
        />

        <TextField
          {...register('password')}
          type={'password'}
          className={cs.txf}
          label={'Password'}
          error={errors.password}
        />

        <ControlledCheckbox
          control={control}
          defaultValue={true}
          className={s.checkbox}
          label={'Remember me'}
          name={'rememberMe'}
        />

        <Typography variant={'body2'} className={s.forgotPasswordWrapper}>
          <Link className={clsx(s.linkWrapper, s.forgotPasswordLink)} to={'/reset-password'}>
            Forgot Password?
          </Link>
        </Typography>

        <Button fullWidth={true} className={cs.btn}>
          <Typography variant={'subtitle2'}>Sign In</Typography>
        </Button>

        <Typography variant={'body2'} className={cs.footnote}>
          Don&apos;t have an account?
        </Typography>

        <Typography variant={'link1'}>
          <Link className={s.linkWrapper} to={'/sign-up'}>
            Sign Up
          </Link>
        </Typography>
      </form>
    </Card>
  )
}
