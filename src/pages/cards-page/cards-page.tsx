import { FC } from 'react'

import { Link, useParams } from 'react-router-dom'

import { ReactComponent as ArrowBack } from '../../assets/icons/arrow-back-outline.svg'

import s from './cards.module.scss'

import { Skeleton, Table, TableColumns, THead, Typography } from '@/components'
import { Pagination } from '@/components/ui/pagination'
import { CardsHeaders } from '@/pages/cards-page/cards-headers.tsx'
import { CardsTableBody } from '@/pages/cards-page/cards-table-body.tsx'
import { EmptyDeckPage } from '@/pages/cards-page/empty-deck-page/empty-deck-page.tsx'
import { useGetCards } from '@/pages/cards-page/hooks/useGetCards.ts'
import { useSkeletonHeightState } from '@/pages/decks-page/hook/useSkeletonHeightState.ts'
import { useGetMeQuery } from '@/services/auth/auth.service.ts'
import { useGetDeckQuery } from '@/services/cards/cards.service.ts'
import { friendsOrderName } from '@/services/cards/cards.types.ts'

const myColumnsTitles: TableColumns<friendsOrderName> = [
  { title: 'Question', orderName: 'question' },
  { title: 'Answer', orderName: 'answer' },
  { title: 'LastUpdate', orderName: 'updated' },
  { title: 'Grade' },
  { title: '' },
]

const friendsColumnsTitles: TableColumns<friendsOrderName> = [...myColumnsTitles]

friendsColumnsTitles.pop()

const perPageCountVariant = ['10', '20', '30', '50', '100']
const initialSkeletonHeight = 374

export const CardsPage: FC = () => {
  const {
    isFetching,
    isError,
    deckData: {
      pagination: { currentPage, itemsPerPage, totalPages },
      items,
    },
    isLoadingDecksData,
    sort,
    setSortMemo,
    setCurrentPageMemo,
    setItemsPerPageMemo,
  } = useGetCards()

  const { deckId } = useParams()

  const packId = deckId ? deckId : ''

  const { data } = useGetDeckQuery(packId)

  const { data: userData } = useGetMeQuery()

  const isAuthorDeck = data?.userId === userData.id
  const deckTitle = data?.name
  const isDeckEmpty = data?.cardsCount === 0

  let [skeletonHeight, setSkeletonHeight] = useSkeletonHeightState(initialSkeletonHeight)

  if (isError) return <h1>Error!</h1>

  return (
    <div className={s.pageWrapper}>
      <Link style={{ textDecoration: 'none' }} to={'/'}>
        <div className={s.linkArrowContainer}>
          <ArrowBack />
          <Typography variant={'body2'}>Back to Deck List</Typography>
        </div>
      </Link>
      {isDeckEmpty ? (
        <>
          <EmptyDeckPage deckTitle={deckTitle} isAuthorDeck={isAuthorDeck} />
        </>
      ) : (
        <>
          <CardsHeaders
            isAuthorDeck={isAuthorDeck}
            cardsPageTitle={deckTitle}
            disabled={isFetching}
          />
          <Table variant={isAuthorDeck ? 'myCards' : 'cards'}>
            <THead
              columns={isAuthorDeck ? myColumnsTitles : friendsColumnsTitles}
              onSort={setSortMemo}
              currentSort={sort}
              disabled={isFetching}
            />
            <CardsTableBody items={items} onChangeHeight={setSkeletonHeight} />
          </Table>
          <Skeleton
            isFetching={isFetching}
            isLoading={isLoadingDecksData}
            currentHeight={skeletonHeight.current}
          />
          <div className={s.paginationWrapper}>
            <Pagination
              disabled={isFetching}
              perPageCountVariant={perPageCountVariant}
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              changePage={setCurrentPageMemo}
              changeItemsPerPage={setItemsPerPageMemo}
              className={s.pagination}
            />
          </div>
        </>
      )}
    </div>
  )
}
