import s from './deck.module.scss'

import { Table, TdCell, TdIcons, THead, TRow } from '@/components'
import { useGetDecksQuery } from '@/services/base-api.ts'

export const Decks = () => {
  const { data } = useGetDecksQuery()

  console.log(data)

  let mappedRow: any[] = []

  if (data) {
    mappedRow = data.items.map(item => {
      const updateData = new Date(Date.parse(item.updated)).toLocaleString()
      //TODO remove hours

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
      <Table variant={'packs'}>
        <THead columns={['Name', 'Cards', 'LastUpdate', 'Created by', '']} />
        <tbody>{mappedRow}</tbody>
      </Table>
    </div>
  )
}
