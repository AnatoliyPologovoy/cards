import { Meta, StoryObj } from '@storybook/react'

import { Card } from './card.tsx'

const meta = {
  title: 'Components/UI/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: { type: 'text' },
      description: 'Предназначен для передачи содержимого внутрь карточки.',
    },
    className: {
      description: 'Стили',
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultCard: Story = {
  args: {
    children: <div>Hello friend</div>,
  },
}
