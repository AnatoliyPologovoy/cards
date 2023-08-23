import { useState } from 'react'

import * as Slider from '@radix-ui/react-slider'

import s from './slider.module.scss'

export const SliderApp = () => {
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMinMaxValue] = useState(50)

  const handlerSliderChange = (number: number[]) => {
    console.log(number)
    setMinValue(number[0])
    setMinMaxValue(number[1])
  }

  return (
    <form>
      <input
        style={{ background: 'transparent' }}
        type={'number'}
        value={minValue}
        onChange={event => setMinValue(+event.currentTarget.value)}
      />

      <Slider.Root
        value={[minValue, maxValue]}
        defaultValue={[25, 75]}
        className={s.SliderRoot}
        onValueChange={handlerSliderChange}
      >
        <Slider.Track className={s.SliderTrack}>
          <Slider.Range className={s.SliderRange} />
        </Slider.Track>
        <Slider.Thumb className={s.SliderThumb} />
        <Slider.Thumb className={s.SliderThumb} />
      </Slider.Root>
      <input type={'number'} value={maxValue} onChange={() => {}} />
    </form>
  )
}
