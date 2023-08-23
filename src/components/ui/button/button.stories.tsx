import type { Meta, StoryObj } from '@storybook/react'

import ExitIcon from '../../../common/icons/logout.svg'

import { Button } from './'

const meta = {
  title: 'Components/UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'tertiary', 'link'],
      control: { type: 'radio' },
      description: 'Вариант внешнего вида кнопки',
    },
    children: {
      name: 'label',
      description: 'Наименование кнопки/ссылки',
    },
    onClick: {
      action: 'button click',
      type: 'function',
      description: 'Колбэк обработки события',
    },
    fullWidth: {
      description: 'Свойство - на всю ширину контейнера',
    },
    className: {
      description: 'Стили',
    },
    icon: {
      description: 'Иконка',
    },
    as: {
      description: `Полиморфный компонент. Свойство типа ElementType определяет тип компонента. Component&lt;T&gt;`,
      defaultValue: 'button',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button primary',
    disabled: false,
  },
}

export const PrimaryImg: Story = {
  args: {
    icon: <img src={ExitIcon} alt="exit_icon" style={{ color: '#fff' }} />,
    ...Primary.args,
  },
  name: 'Primary With Img',
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button secondary ',
    disabled: false,
  },
}

export const SecondaryImg: Story = {
  args: {
    icon: <img src={ExitIcon} alt="exit_icon" style={{ color: '#fff' }} />,
    ...Secondary.args,
  },
  name: 'Secondary With Img',
}

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button',
    disabled: false,
  },
}

export const LinkAsButton: Story = {
  args: {
    variant: 'link',
    as: 'a',
    children: 'Link-button',
  },
}

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    children: 'FullWidth Button',
    disabled: false,
    fullWidth: true,
  },
}
