import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { Decks } from '@/pages/decks/decks'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <div>login</div>,
  },
]

const AccessToPrivateRoutes = () => {
  const isAuthorized = true

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
