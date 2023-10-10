import { Provider } from 'react-redux'

import { Header } from '@/components'
import { Router } from '@/router.tsx'
import { store } from '@/services/store.ts'

export function App() {
  // const { data: me } = useGetMeQuery()

  return (
    <>
      <Provider store={store}>
        <Header isLoggedIn={false} />
        <Router />
      </Provider>
    </>
  )
}
