import { Button } from './components/ui'
import { SliderApp } from './components/ui/slider'

export function App() {
  return (
    <div>
      <Button variant="primary" as="a" fullWidth={false}>
        Hello
      </Button>
      <div>
        <Button variant="secondary" fullWidth={false}>
          hello2
        </Button>
      </div>
      <div>
        <SliderApp />
      </div>
    </div>
  )
}
