import { any, z } from 'zod'

const zEmail = z.string().email()
const zPassword = z
  .string()
  .min(3, { message: 'Password should be at least 3 characters' })
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

export const createNewPasswordSchema = z.object({
  password: zPassword,
})

export const updateNameSchema = z.object({
  name: z.string(),
})

export const createDeckSchema = z.object({
  name: z.string().min(3).max(30),
  isPrivate: z.boolean(),
  cover: any(),
})

export const createCardSchema = z.object({
  question: z.string().min(3),
  answer: z.string().min(3),
  questionImg: any(),
  answerImg: any(),
  questionVideo: any(),
  answerVideo: any(),
})
