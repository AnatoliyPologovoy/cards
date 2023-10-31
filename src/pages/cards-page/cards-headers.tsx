import { ChangeEvent, FC, memo, useCallback, useState } from 'react'

import { ReactComponent as EditPen } from '../../assets/icons/editPen.svg'
import { ReactComponent as PlayIcon } from '../../assets/icons/playIcon.svg'
import { ReactComponent as TrashIcon } from '../../assets/icons/trashIcon.svg'

import s from './cards.module.scss'

import { debounce } from '@/common/utils/debounce.ts'
import { Button, TextField, ToolbarItemWithIcon, Typography } from '@/components'
import { useAppDispatch } from '@/hooks/hooks.ts'
import { MyPackDropDown } from '@/pages/cards-page/my-pack-drop-down'
import { changeSearchName } from '@/store/cards.slice.ts'

type Props = {
  isAuthorDeck: boolean
  // onChangeSearchInput: (searchValue: string) => void
  disabled: boolean
  cardsPageTitle: string | undefined
}
export const CardsHeaders: FC<Props> = memo(({ disabled, cardsPageTitle, isAuthorDeck }) => {
  const dispatch = useAppDispatch()
  const onChangeSearchInput = useCallback(
    debounce((searchValue: string) => {
      dispatch(changeSearchName(searchValue))
    }, 1000),
    []
  )

  const [searchInputValue, setSearchInputValue] = useState('')
  const changeSearchInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //for UI
    setSearchInputValue(e.currentTarget.value)
    //for fetch
    onChangeSearchInput(e.currentTarget.value)
  }

  const MyPackDropDownHandler = () => {
    return (
      <MyPackDropDown>
        <ToolbarItemWithIcon
          icon={<PlayIcon />}
          text={'Learn'}
          onSelect={() => {}}
        ></ToolbarItemWithIcon>
        <ToolbarItemWithIcon
          icon={<EditPen />}
          text={'Edit'}
          onSelect={() => {}}
        ></ToolbarItemWithIcon>
        <ToolbarItemWithIcon
          icon={<TrashIcon />}
          text={'Delete'}
          onSelect={() => {}}
        ></ToolbarItemWithIcon>
      </MyPackDropDown>
    )
  }

  return (
    <div className={s.headerWrapper}>
      <div className={s.titleWrapper}>
        <div className={s.dotsWrapper}>
          <Typography variant={'large'}>{cardsPageTitle}</Typography>
          {isAuthorDeck ? <MyPackDropDownHandler /> : null}
        </div>
        {isAuthorDeck ? (
          <Button variant={'primary'} disabled={disabled} onClick={() => {}}>
            <Typography variant={'subtitle2'}>Add Card</Typography>
          </Button>
        ) : (
          <Button variant={'primary'} disabled={disabled} onClick={() => {}}>
            <Typography variant={'subtitle2'}>Learn Pack</Typography>
          </Button>
        )}
      </div>
      <div className={s.filtersWrapper}>
        <TextField
          disabled={disabled}
          type={'search'}
          className={s.searchInput}
          value={searchInputValue}
          onChange={changeSearchInputHandler}
        />
      </div>
    </div>
  )
})
