import { FC, HTMLProps, ReactNode } from 'react'

import s from './card.module.scss'

type CardProps = {
  children: ReactNode
} & HTMLProps<HTMLDivElement>

export const Card: FC<CardProps> = ({ className, children, ...rest }) => {
  return (
    <div className={`${s.cardContainer} ${className}}`} {...rest}>
      {children}
    </div>
  )
}
