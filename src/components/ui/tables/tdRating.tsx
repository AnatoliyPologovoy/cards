import { ComponentPropsWithoutRef, FC } from 'react'

import { ReactComponent as EmptyStar } from '../../../assets/icons/emptyStar.svg'
import { ReactComponent as FillStar } from '../../../assets/icons/fillStar.svg'

import s from './table.module.scss'

type Props = ComponentPropsWithoutRef<'td'> & {
  rating?: number
}

export const TdRating: FC<Omit<Props, 'children'>> = ({ rating = 5, ...rest }) => {
  const maxRating = 5

  const viewStar = new Array(maxRating).fill(null).map((_e, i) => {
    return i >= rating ? <EmptyStar key={i} /> : <FillStar key={i} />
  })

  return (
    <td {...rest} className={rest.className}>
      <div className={s.tdRating}>{viewStar}</div>
    </td>
  )
}
