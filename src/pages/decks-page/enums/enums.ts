import { TableColumns } from '@/components'
import { DecksOrderName, DecksResponse, TabSwitcher } from '@/services/decks/decks.types.ts'

export const decksColumnsTitles: TableColumns<DecksOrderName> = [
  { title: 'Name', orderName: 'name' },
  { title: 'Cards', orderName: 'cardsCount' },
  { title: 'Last Update', orderName: 'updated' },
  { title: 'Created by' },
  { title: '' },
]
export const perPageCountVariant = ['10', '20', '30', '50', '100']
export const initialSkeletonHeight = 374
export const initialDecksData: DecksResponse = {
  items: [],
  maxCardsCount: 100,
  pagination: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 0,
  },
}
export const tabSwitcherValue: {
  value: TabSwitcher
}[] = [{ value: 'My Decks' }, { value: 'All Decks' }]
