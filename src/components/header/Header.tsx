import clsx from 'clsx'
import ThemeToggle from '../theme/ThemeToggle'

const Header = () => {
  return (
    <div className={clsx('flex justify-between items-center mb-4')}>
      <h1 className="text-3xl font-bold">TextCrypt</h1>
      <ThemeToggle />
    </div>
  )
}

export default Header
