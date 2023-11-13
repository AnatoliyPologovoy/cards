import { ChangeEvent, useRef, useState } from 'react'

import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import s from './imageInput.module.scss'

import coverIcon from '@/assets/icons/cover.svg'
import { toImage64 } from '@/common/utils/toImage64.ts'
import { Button } from '@/components'

type Props<TFieldValues extends FieldValues> = UseControllerProps<TFieldValues>

export const ImageInput = <TFieldValues extends FieldValues>({
  control,
  name,
  defaultValue,
  rules,
  shouldUnregister,
  ...rest
}: Props<TFieldValues>) => {
  const {
    field: { onChange },
  } = useController({
    control,
    name,
    defaultValue,
    rules,
    shouldUnregister,
  })

  const [image, setImage] = useState<string | null>(null)

  const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const file = e.currentTarget.files[0]

      toImage64(file).then(image64 => {
        //for UI
        setImage(image64)
        //for fetch
        onChange(file)
      })
    }
  }
  const iconForBtn = (
    <img src={coverIcon} alt="cover icon" style={{ marginRight: '10px', marginTop: '-1px' }} />
  )
  const originalInput = useRef<HTMLInputElement | null>(null)
  const onClickChoiceImage = () => originalInput?.current?.click()

  return (
    <div>
      {image && <img src={image} alt="#" width={'auto'} height={120} className={s.imagePreview} />}
      {/*hidden original input type=file*/}
      <input
        type="file"
        onChange={onChangeImage}
        accept="image/png, image/jpeg"
        ref={originalInput}
        className={s.hiddenInput}
        {...rest}
      />
      <Button
        variant={'secondary'}
        fullWidth={true}
        type={'button'}
        onClick={onClickChoiceImage}
        className={s.chooseButton}
        icon={iconForBtn}
      >
        Change Cover
      </Button>
    </div>
  )
}
