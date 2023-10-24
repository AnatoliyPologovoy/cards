import { FC } from 'react'

import { Link } from 'react-router-dom'

import { ReactComponent as ArrowBack } from '../../assets/icons/arrow-back-outline.svg'

import s from './deck.module.scss'

import { Skeleton, Table, TableColumns, THead, Typography } from '@/components'
import { Pagination } from '@/components/ui/pagination'
import { DeckHeaders } from '@/pages/deck-page/deck-headers.tsx'
import { DeckTableBody } from '@/pages/deck-page/deck-table-body.tsx'
import { friendsOrderName } from '@/pages/deck-page/deck.types.ts'
import { useGetDeck } from '@/pages/deck-page/useGetDeck.tsx'
import { useSkeletonHeightState } from '@/pages/decks-page/hook/useSkeletonHeightState.ts'

const friendsColumnsTitles: TableColumns<friendsOrderName> = [
  { title: 'Question', orderName: 'question' },
  { title: 'Answer', orderName: 'answer' },
  { title: 'LastUpdate', orderName: 'updated' },
  { title: 'Grade' },
  // { title: '' },
]
const perPageCountVariant = ['10', '20', '30', '50', '100']
const initialSkeletonHeight = 374

export const Deck: FC = () => {
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
    onChangeSearchInputMemo,
    setCurrentPageMemo,
    setItemsPerPageMemo,
  } = useGetDeck()

  let [skeletonHeight, setSkeletonHeight] = useSkeletonHeightState(initialSkeletonHeight)

  if (isError) return <h1>Error!</h1>

  return (
    <div className={s.pageWrapper}>
      <Link style={{ textDecoration: 'none' }} to={'/'}>
        <div className={s.linkArrowContainer}>
          <ArrowBack />
          <Typography variant={'body2'}>Back to Packs List</Typography>
        </div>
      </Link>
      <DeckHeaders disabled={isFetching} onChangeSearchInput={onChangeSearchInputMemo} />
      <Table variant={'cards'}>
        <THead
          columns={friendsColumnsTitles}
          onSort={setSortMemo}
          currentSort={sort}
          disabled={isFetching}
        />
        <DeckTableBody items={items} onChangeHeight={setSkeletonHeight} />
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
    </div>
  )
}
