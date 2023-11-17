import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Button, Card, TextField, Typography } from '../../../ui'
import s from '../forms.module.scss'

import { signUpSchema } from '@/common/utils'
import { FormPropsType, MainFormType } from '@/components'
import { SingUpArgs } from '@/services/auth/auth.types.ts'

export const SignUp = ({ onSubmit }: FormPropsType<SingUpArgs>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MainFormType>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(signUpSchema),
    mode: 'onTouched',
  })

  const submit = ({ password, email }: MainFormType) => {
    onSubmit({ password, email })
  }

  return (
    <Card className={s.formWrapper}>
      <form onSubmit={handleSubmit(submit)} className={s.formContainer}>
        <Typography variant={'large'} className={s.header}>
          Sign Up
        </Typography>

        <TextField
          {...register('email')}
          error={errors.email}
          label={'Email'}
          placeholder={'Email'}
          className={s.txf}
        />

        <TextField
          {...register('password')}
          error={errors.password}
          label={'Password'}
          type={'password'}
          className={s.txf}
        />

        <TextField
          {...register('confirmPassword')}
          error={errors.confirmPassword}
          label={'Confirm Password'}
          placeholder={'Confirm Password'}
          type={'password'}
          className={s.txf}
        />

        {/*<Link to={'/auth/success-sign-up'}>*/}
        <Button fullWidth={true} className={s.btn}>
          <Typography variant={'subtitle2'}>Sign Up</Typography>
        </Button>
        {/*</Link>*/}

        <Typography variant={'body2'} className={s.footnote}>
          Already have an account?
        </Typography>

        <Typography variant={'link1'}>
          <Link className={s.linkWrapper} to={'/auth/login'}>
            Sign In
          </Link>
        </Typography>
      </form>
    </Card>
  )
}
