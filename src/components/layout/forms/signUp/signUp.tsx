import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { signUpSchema } from '../../../../common/utils'
import { Button, Card, TextField, Typography } from '../../../ui'
import s from '../forms.module.scss'
import { FormPropsType, MainFormType } from '../forms.types.ts'

export const SignUp = ({ onSubmit }: FormPropsType<MainFormType>) => {
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

  return (
    <Card className={s.formWrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.formContainer}>
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

        <Button fullWidth={true} className={s.btn}>
          <Typography variant={'subtitle2'}>Sign Up</Typography>
        </Button>

        <Typography variant={'body2'} className={s.footnote}>
          Already have an account?
        </Typography>

        <Typography variant={'link1'} href={'#'}>
          Sign In
        </Typography>
      </form>
    </Card>
  )
}
