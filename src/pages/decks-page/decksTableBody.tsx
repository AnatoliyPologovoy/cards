import { ComponentProps, FC, memo, useEffect, useRef } from 'react'

import { useNavigate } from 'react-router-dom'

import s from './decks.module.scss'

import { TdCell, TdIcons, TRow } from '@/components'
import { ModalVariant } from '@/pages/decks-page/hook/useDeckModalState.ts'
import { DecksResponseItems } from '@/services/decks/decks.types.ts'

type Props = {
  items: DecksResponseItems[]
  authorId: string
  onChangeHeight: (value: number) => void
  onClickEditOrDeleteIcons: (id: string, name: string, variant: ModalVariant) => void
} & ComponentProps<'tbody'>

export const DecksTableBody: FC<Props> = memo(
  ({ onClickEditOrDeleteIcons, onChangeHeight, items, authorId }) => {
    const navigate = useNavigate()
    const mappedRow = items.map(item => {
      const updateData = new Date(Date.parse(item.updated)).toLocaleString('ru', {
        dateStyle: 'short',
      })
      const playDeckHandler = () => console.log('play deck id: ', item.id)
      const editDeckHandler = () => onClickEditOrDeleteIcons(item.id, item.name, 'updateDeck')
      const deleteDeckHandler = () => onClickEditOrDeleteIcons(item.id, item.name, 'deleteDeck')

      const isAuthor = authorId === item.author.id
      const onEdit = isAuthor ? editDeckHandler : null
      const onDelete = isAuthor ? deleteDeckHandler : null

      return (
        <TRow className={s.tRow} key={item.id}>
          <TdCell onClick={() => navigate(`/deck/${item.id}`)} img={item.cover ?? null}>
            {item.name}
          </TdCell>
          <TdCell>{item.cardsCount}</TdCell>
          <TdCell>{updateData}</TdCell>
          <TdCell>{item.author.name}</TdCell>
          <TdIcons onPlay={playDeckHandler} onEdit={onEdit} onDelete={onDelete} />
        </TRow>
      )
    })

    const tbodyRef = useRef<null | HTMLTableSectionElement>(null)

    useEffect(() => {
      onChangeHeight(tbodyRef.current?.offsetHeight ?? 0)
    })

    return <tbody ref={tbodyRef}>{mappedRow}</tbody>
  }
)
