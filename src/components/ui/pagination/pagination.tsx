import { FC, memo } from 'react'

import { clsx } from 'clsx'

import s from './pagination.module.scss'

import { ReactComponent as Arrow } from '@/assets/icons/arrowLeft.svg'
import { SelectC, Typography } from '@/components/ui'
import { getCurrentPortion, getPortion } from '@/components/ui/pagination/pagination.utils.tsx'

type Props = {
  currentPage: number
  totalPages: number
  maxCountShowBtn?: number
  minCountShowBtn?: number
  itemsPerPage: number
  changePage: (newPage: number) => void
  changeItemsPerPage: (items: number) => void
  className?: string
  perPageCountVariant: string[]
  disabled?: boolean
}

export const Pagination: FC<Props> = memo(
  ({
    minCountShowBtn = 3,
    maxCountShowBtn = 5,
    totalPages,
    currentPage,
    changePage,
    changeItemsPerPage,
    itemsPerPage,
    perPageCountVariant,
    className,
    disabled,
  }) => {
    const portions = getPortion(totalPages, maxCountShowBtn, minCountShowBtn)
    const currentPortion = getCurrentPortion(currentPage, portions)
    //callBacks
    const clickRightArrowHandler = () => !disabled && changePage(currentPage + 1)
    const clickLeftArrowHandler = () => !disabled && changePage(currentPage - 1)
    const onChangeSelectHandle = (value: string) => !disabled && changeItemsPerPage(Number(value))
    const onClickPageButton = (page: number) => () => !disabled && changePage(page)

    const renderButton = (value: number, buttonStyle: string) => {
      return (
        <button key={value} className={buttonStyle} tabIndex={0} onClick={onClickPageButton(value)}>
          {value}
        </button>
      )
    }

    const renderButtons = portions[currentPortion]?.map(num => {
      const buttonStyle = clsx(
        s.pageButton,
        currentPage === num && s.currentPage,
        disabled && s.disabledButton
      )

      return renderButton(num, buttonStyle)
    })

    // is show first/last button
    const firstButtonStyle = clsx(
      s.pageButton,
      currentPage === 1 && s.currentPage,
      disabled && s.disabledButton
    )
    const renderFirstButton = currentPortion > 0 && renderButton(1, firstButtonStyle)
    const lastButtonStyle = clsx(s.pageButton, disabled && s.disabledButton)
    const renderLastButton =
      currentPortion < portions.length - 1 && renderButton(totalPages, lastButtonStyle)

    //is show dots
    const dots = <div className={s.dots}>...</div>
    const renderFirstDots = currentPortion > 0 && dots
    const renderLastDots = currentPortion < portions.length - 1 && dots

    //is disabled arrows
    const isDisabledArrowLeft = currentPage === 1
    const isDisabledArrowRight = currentPage === totalPages || totalPages === 0

    //styles
    const wrapperStyle = clsx(s.wrapper, className)

    return (
      <div className={wrapperStyle}>
        <button
          className={s.arrowWrapper}
          disabled={isDisabledArrowLeft}
          onClick={clickLeftArrowHandler}
        >
          <Arrow className={s.arrowLeft} />
        </button>
        {renderFirstButton}
        {renderFirstDots}
        <div className={s.pageButtons}>{renderButtons}</div>
        {renderLastDots}
        {renderLastButton}
        <button
          className={s.arrowWrapper}
          onClick={clickRightArrowHandler}
          tabIndex={0}
          disabled={isDisabledArrowRight}
        >
          <Arrow className={s.arrowRight} />
        </button>
        <div className={s.showPerPageWrapper}>
          <Typography variant={'body2'}>Показать</Typography>
          <SelectC
            isDisabled={disabled}
            values={perPageCountVariant}
            startValue={itemsPerPage.toString()}
            className={s.select}
            onValueChange={onChangeSelectHandle}
          />
          <Typography variant={'body2'}>на странице</Typography>
        </div>
      </div>
    )
  }
)
