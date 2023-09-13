import { z } from 'zod'

const zEmail = z.string().email()
const zPassword = z
  .string()
  .min(6, { message: 'Password should be at least 6 characters' })
  .max(30, { message: 'Password should be not more 30 characters' })

export const signInSchema = z.object({
  email: zEmail,
  password: zPassword,
  rememberMe: z.boolean(),
})

export const signUpSchema = z
  .object({
    email: zEmail,
    password: zPassword,
    confirmPassword: z.string().nonempty('Should be equal Password field'),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Password don't match",
  })

export const forgotPasswordSchema = z.object({
  email: zEmail,
})

export const updateNameSchema = z.object({
  name: z.string(),
})