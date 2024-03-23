'use client'

import { IconMoon, IconSun } from '@tabler/icons-react'
import clsx from 'clsx'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme()

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.cookie = `theme=${newTheme}; path=/`
  }

  return (
    <div className={clsx('flex justify-end')}>
      <button
        onClick={toggleTheme}
        className={clsx(
          'm-4 p-2',
          resolvedTheme === 'light'
            ? 'bg-gray-300 text-gray-800'
            : 'bg-gray-800 text-white'
        )}
      >
        {resolvedTheme === 'light' ? <IconSun /> : <IconMoon />}
      </button>
    </div>
  )
}

export default ThemeToggle
