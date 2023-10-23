import s from './personalInformation.module.scss'

import { ReactComponent as EditPen } from '@/assets/icons/editPen.svg'
import logoutIcon from '@/assets/icons/logout.svg'
import { Button, Typography } from '@/components/ui'

type Props = {
  userEmail: string
  userName: string
  editNameIconHandler: () => void
  logoutHandler: () => void
}

export const ShowInfo = ({ userEmail, userName, editNameIconHandler, logoutHandler }: Props) => {
  const logoutImg = (
    <img src={logoutIcon} alt="logout_icon" className={s.logoutImg} width={16} height={16} />
  )

  return (
    <>
      <div className={s.userNameBox}>
        <Typography variant={'h1'} className={s.userName}>
          {userName ? userName : 'user name'}
        </Typography>
        <EditPen className={s.editUserNameIcon} onClick={editNameIconHandler} />
      </div>
      <Typography variant={'body2'} className={s.userMail}>
        {userEmail ? userEmail : 'user@mail.com'}
      </Typography>
      <Button
        className={s.logoutBtn}
        variant={'secondary'}
        icon={logoutImg}
        onClick={logoutHandler}
      >
        <Typography variant={'subtitle2'}>Logout</Typography>
      </Button>
    </>
  )
}
