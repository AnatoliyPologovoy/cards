import { FC, memo, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { createCardSchema } from '@/common/utils'
import { Button, SelectC, TextField, Typography } from '@/components'
import { Modal } from '@/components/layout/forms'
import { ModalButton } from '@/components/layout/forms/modal/modalButton.tsx'
import { ModalClose } from '@/components/layout/forms/modal/modalClose.tsx'
import { ModalContent } from '@/components/layout/forms/modal/modalContent.tsx'
import { ModalField } from '@/components/layout/forms/modal/modalField.tsx'
import { ModalTitle } from '@/components/layout/forms/modal/modalTitle.tsx'
import { ImageInput } from '@/components/ui/imageInput/imageInput.tsx'
import s from '@/pages/cards-page/cards.module.scss'
import { useCUDCards } from '@/pages/cards-page/hooks/useCUDCards.ts'
import { cardsGetModalTitles } from '@/pages/cards-page/utils/CardsGetModalTitles.ts'
import { CardModalVariant, CurrentCardData } from '@/services/cards/cards.types.ts'

export type CardsModalsProps = {
  isOpenCardModal: boolean
  setIsOpenCardModal: (isOpen: boolean) => void
  variant: CardModalVariant
  currentCardData: CurrentCardData
  packId: string
}

export const CardsCUDModals: FC<CardsModalsProps> = memo(
  ({ isOpenCardModal, setIsOpenCardModal, variant, currentCardData, packId }) => {
    const [fieldsVariant, setFieldsVariant] = useState('Text')

    const {
      formState: { errors },
      register,
      handleSubmit,
      control,
      reset,
    } = useForm<CurrentCardData>({
      defaultValues: {
        id: currentCardData.id,
        question: currentCardData.question,
        answer: currentCardData.answer,
      },
      values: {
        question: currentCardData.question,
        answer: currentCardData.answer,
      },
      resolver: zodResolver(createCardSchema),
    })

    const { deleteCard, createCard, updateCard, isLoading } = useCUDCards(
      currentCardData,
      setIsOpenCardModal,
      setFieldsVariant,
      reset,
      packId
    )

    const onSubmit = variant === 'createCard' ? createCard : updateCard

    const titleData = cardsGetModalTitles(variant)

    const onCloseBtn = () => {
      setFieldsVariant('Text')
      setIsOpenCardModal(false)
    }

    const formVariant =
      fieldsVariant === 'Picture' ? (
        <>
          <label>
            <Typography variant={'subtitle2'}>Question:</Typography>
            <ImageInput name={'questionImg'} control={control} />
          </label>
          <label>
            <Typography variant={'subtitle2'}>Answer:</Typography>
            <ImageInput name={'answerImg'} control={control} />
          </label>
        </>
      ) : (
        <>
          <TextField
            autoFocus
            {...register('question')}
            label={'Question'}
            placeholder={'Question'}
            className={s.nameInput}
            error={errors.question}
          />
          <TextField
            {...register('answer')}
            label={'Answer'}
            placeholder={'Answer'}
            className={s.nameInput}
            error={errors.answer}
          />
        </>
      )

    //-----JSX-----
    //  Create Card or Update Card
    const formCardCreateOrUpdate = (
      <form onSubmit={handleSubmit(onSubmit)} className={s.formCard}>
        <SelectC
          values={['Text', 'Picture']}
          onValueChange={setFieldsVariant}
          startValue={'Text'}
          label={'Choose question format'}
        />
        {formVariant}
        <ModalButton>
          <Button variant={'secondary'} onClick={onCloseBtn} type={'button'}>
            Close
          </Button>
          <Button variant={'primary'} type={'submit'} disabled={isLoading}>
            {titleData.buttonTitle}
          </Button>
        </ModalButton>
      </form>
    )

    //  Delete Card
    const deletingContent = (
      <>
        <span className={s.deleteText}>
          Do you really want to remove{' '}
          <i className={s.deleteTextName}>{currentCardData.question}</i> ? The card will be deleted.
        </span>
        <ModalButton>
          <Button variant={'secondary'} onClick={onCloseBtn} type={'button'}>
            Close
          </Button>
          <Button variant={'primary'} type={'submit'} disabled={isLoading} onClick={deleteCard}>
            {titleData.buttonTitle}
          </Button>
        </ModalButton>
      </>
    )

    const mainContent = variant === 'deleteCard' ? deletingContent : formCardCreateOrUpdate

    return (
      <Modal isOpen={isOpenCardModal} onOpenChange={setIsOpenCardModal}>
        <ModalContent>
          <ModalTitle>{titleData.title}</ModalTitle>
          <ModalClose onClick={onCloseBtn}>X</ModalClose>
          <ModalField>{mainContent}</ModalField>
        </ModalContent>
      </Modal>
    )
  }
)
