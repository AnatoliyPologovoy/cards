import { ChangeEvent, FC, memo, useState } from 'react'

import deleteIcon from '@/assets/icons/trashIcon.svg'
import { Button, Slider, TabSwitcher, TextField, Typography } from '@/components'
import s from '@/pages/decks-page/decks.module.scss'
import { ChangeSwitcherValues } from '@/pages/decks-page/hook/useGetDecks.tsx'

type Props = {
  switcherValue: string
  onChangeSearchInput: (searchValue: string) => void
  onChangeTabSwitcher: (value: string) => void
  onChangeSlider: (minValue: number, maxValue: number) => void
  maxCardsCount: number
  clearFilter: () => void
  getFuncSetting: (arg: ChangeSwitcherValues) => void
  disabled: boolean
}
export const DecksHeaderFilters: FC<Props> = memo(
  ({
    onChangeSearchInput,
    onChangeTabSwitcher,
    maxCardsCount,
    onChangeSlider,
    switcherValue,
    clearFilter,
    getFuncSetting,
    disabled,
  }) => {
    const [searchInputValue, setSearchInputValue] = useState('')
    const changeSearchInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
      //for UI
      setSearchInputValue(e.currentTarget.value)
      //for fetch
      onChangeSearchInput(e.currentTarget.value)
    }
    const onClickClearFilter = () => {
      clearFilter()
      setSearchInputValue('')
    }

    const iconForBtn = (
      <img src={deleteIcon} alt="trash icon" style={{ marginRight: '3px', marginTop: '-3px' }} />
    )

    return (
      <div className={s.headerWrapper}>
        <div className={s.titleWrapper}>
          <Typography variant={'large'}>Decks list</Typography>
          <Button variant={'primary'} disabled={disabled}>
            <Typography variant={'subtitle2'}>Add New Deck</Typography>
          </Button>
        </div>
        <div className={s.filtersWrapper}>
          <TextField
            disabled={disabled}
            type={'search'}
            className={s.searchInput}
            value={searchInputValue}
            onChange={changeSearchInputHandler}
          />
          <div className={s.tabSwitcherWrapper}>
            <Typography variant={'body2'} className={s.filterLabel}>
              Show decks cards
            </Typography>
            <TabSwitcher
              disabled={disabled}
              currentValue={switcherValue}
              values={[{ value: 'My Cards' }, { value: 'All Cards' }]}
              defaultValue={'All Cards'}
              onChange={onChangeTabSwitcher}
            />
          </div>
          <div className={s.sliderWrapper}>
            <Typography variant={'body2'} className={s.filterLabel}>
              Number of cards
            </Typography>
            <Slider
              disabled={disabled}
              setFuncForChangeValue={getFuncSetting}
              width={155}
              boundaryMaxValue={maxCardsCount}
              onChange={onChangeSlider}
            />
          </div>
          <Button
            variant={'secondary'}
            icon={iconForBtn}
            onClick={onClickClearFilter}
            disabled={disabled}
          >
            <Typography variant={'subtitle2'}>Clear Filter</Typography>
          </Button>
        </div>
      </div>
    )
  }
)
