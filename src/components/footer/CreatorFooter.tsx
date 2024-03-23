import clsx from 'clsx'
import { useState } from 'react'
import { motion } from 'framer-motion'

const frontEndTeamAliasList = ['R', 'D', 'D', 'S']

const CreatorFooter = () => {
  const [isMouseHover, setIsMouseHover] = useState(false)
  return (
    <footer
      className={clsx(
        'text-sm dark:text-white text-black text-center py-4 mx-auto ',
        'md:text-base md:max-w-lg'
      )}
    >
      <p>Made with ❤️</p>
      <div className={clsx('relative')}>
        <span>By Team Frontend </span>
        <a
          className={clsx('font-semibold', 'hover:underline')}
          href="https://app.btwedutech.com"
          onMouseEnter={() => setIsMouseHover(true)}
          onMouseLeave={() => setIsMouseHover(false)}
          rel="noreferrer"
          target="_blank"
        >
          BTW
        </a>
        {isMouseHover && (
          <figure
            className={clsx(
              'absolute -top-10 -right-24',
              'md:-top-10 md:-right-24'
            )}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                className={clsx('w-20 h-20')}
                alt="drillo-head-crown"
                src="drillo-head-crown.svg"
              />
            </motion.div>
          </figure>
        )}
      </div>
      <div>
        {frontEndTeamAliasList.map((als, index) => (
          <small key={index}>{als}</small>
        ))}
      </div>
    </footer>
  )
}

export default CreatorFooter
