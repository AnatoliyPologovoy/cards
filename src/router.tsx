import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { Decks } from '@/pages/decks/decks'
import { Login } from '@/pages/login/login.tsx'
import { SignUpPage } from '@/pages/signUp/signUpPage.tsx'
import { useGetMeQuery } from '@/services/auth/auth.ts'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
  },
]

const AccessToPrivateRoutes = () => {
  const { isLoading, isError } = useGetMeQuery()

  if (isLoading) return <div>Loading...</div>
  const isAuthorized = !isError

  return isAuthorized ? <Outlet /> : <Navigate to={'/login'} />
}

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <AccessToPrivateRoutes />,
    children: [
      {
        path: '/',
        element: <Decks />,
      },
      {
        path: '/deck',
        element: <div>some deck must be here</div>,
      },
    ],
  },
]

const router = createBrowserRouter([...privateRoutes, ...publicRoutes])

export const Router = () => {
  return <RouterProvider router={router} />
}
