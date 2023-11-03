import { useCallback, useState } from 'react'

import { getDeckParams } from '@/common/utils/getDeckParams.ts'
import { Sort } from '@/components'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks.ts'
import { initialDecksData } from '@/pages/decks-page'
import { useGetMeQuery } from '@/services/auth/auth.service.ts'
import { useGetDecksQuery } from '@/services/decks/decks.service.ts'
import {
  changeCurrentPage,
  changeItemsPerPage,
  changeOrderBy,
} from '@/services/decks/decks.slice.ts'

export const useGetDecks = () => {
  const dispatch = useAppDispatch()

  //-----for pagination--------
  const setItemsPerPageMemo = useCallback((itemsPerPage: number) => {
    dispatch(changeItemsPerPage(itemsPerPage))
  }, [])
  const setCurrentPageMemo = useCallback(
    (currentPage: number) => dispatch(changeCurrentPage(currentPage)),
    []
  )
  //------for sort------------
  const [sort, setSort] = useState<Sort>({ orderName: null, direction: null })
  const setSortMemo = useCallback((sort: Sort) => {
    setSort(sort)
    const sortData = sort.direction ? `${sort.orderName}-${sort.direction}` : null

    dispatch(changeOrderBy(sortData))
  }, [])

  const { data: profileData } = useGetMeQuery()
  //need debouncing decksFilterState
  const decksFilterState = useAppSelector(state => state.decks)
  const { data, currentData, isLoading, isSuccess, isError, isFetching } = useGetDecksQuery(
    getDeckParams(decksFilterState)
  )

  return {
    isFetching,
    isError,
    profileData,
    decksData: currentData || data || initialDecksData,
    isLoadingDecksData: isLoading,
    isHasDecksData: isSuccess,
    sort,
    setSortMemo,
    setCurrentPageMemo,
    setItemsPerPageMemo,
  }
}
