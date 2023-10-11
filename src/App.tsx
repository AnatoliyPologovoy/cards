import { Provider } from 'react-redux'

import { Header } from '@/components'
import { Router } from '@/router.tsx'
import { store } from '@/services/store.ts'

export function App() {
  return (
    <>
      <Provider store={store}>
        <Header />
        <Router />
      </Provider>
    </>
  )
}
