import { ComponentProps, FC, memo, useEffect, useRef } from 'react'

import { useNavigate } from 'react-router-dom'

import s from './decks.module.scss'

import { TdCell, TdIcons, TRow } from '@/components'
import { CurrentDeckData, ModalVariant } from '@/pages/decks-page/hook/useDeckModalState.ts'
import { DecksResponseItem } from '@/services/decks/decks.types.ts'

type Props = {
  items: DecksResponseItem[]
  authorId: string
  onChangeHeight: (value: number) => void
  onClickEditOrDeleteIcons: (deckData: CurrentDeckData, variant: ModalVariant) => void
} & ComponentProps<'tbody'>

export const DecksTableBody: FC<Props> = memo(
  ({ onClickEditOrDeleteIcons, onChangeHeight, items, authorId }) => {
    const navigate = useNavigate()
    const mappedRow = items.map(item => {
      const updateData = new Date(Date.parse(item.updated)).toLocaleString('ru', {
        dateStyle: 'short',
      })

      const deckData: CurrentDeckData = {
        id: item.id,
        name: item.name,
        isPrivate: item.isPrivate,
        cover: item.cover ?? null,
      }

      const playDeckHandler = () => navigate(`/learn/${item.id}`)
      const editDeckHandler = () => onClickEditOrDeleteIcons(deckData, 'updateDeck')
      const deleteDeckHandler = () => onClickEditOrDeleteIcons(deckData, 'deleteDeck')

      const isAuthor = authorId === item.author.id
      const onEdit = isAuthor ? editDeckHandler : null
      const onDelete = isAuthor ? deleteDeckHandler : null

      return (
        <TRow className={s.tRow} key={item.id}>
          <TdCell
            onClick={() => navigate(`/deck/${item.id}`)}
            img={item.cover ?? null}
            isPrivate={item.isPrivate}
            className={s.titleCell}
          >
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
