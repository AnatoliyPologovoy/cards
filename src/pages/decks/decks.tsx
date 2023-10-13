import s from './deck.module.scss'

import { Button, Table, TdCell, TdIcons, THead, TRow } from '@/components'
import { useLogOutMutation } from '@/services/auth/auth.ts'
import { useGetDecksQuery } from '@/services/base-api'

export const Decks = () => {
  const { data } = useGetDecksQuery()
  const [logout] = useLogOutMutation()

  let mappedRow: any[] = []

  if (data) {
    mappedRow = data.items.map(item => {
      const updateData = new Date(Date.parse(item.updated)).toLocaleString('en', {
        dateStyle: 'short',
      })

      return (
        <TRow key={item.id}>
          <TdCell>{item.name}</TdCell>
          <TdCell>{item.cardsCount}</TdCell>
          <TdCell>{updateData}</TdCell>
          <TdCell>{item.author.name}</TdCell>
          <TdIcons
            onPlay={() => console.log('play')}
            onEdit={() => console.log('edit')}
            onDelete={() => console.log('delete')}
          />
        </TRow>
      )
    })
  }

  return (
    <div className={s.pageWrapper}>
      <Button variant={'secondary'} onClick={() => logout()}>
        Logout
      </Button>
      <Table variant={'packs'}>
        <THead columns={['Name', 'Cards', 'LastUpdate', 'Created by', '']} />
        <tbody>{mappedRow}</tbody>
      </Table>
    </div>
  )
}
