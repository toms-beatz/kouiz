'use client'

import { UserRoundCheck, UserRoundPlus, Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const MobileNav = () => {
  const [isOpen, setOpen] = useState<boolean>(false)

  const toggleOpen = () => setOpen((prev) => !prev)

  const pathname = usePathname()

  useEffect(() => {
    if (isOpen) toggleOpen()
  }, [pathname])

  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      toggleOpen()
    }
  }

  return (
    <div className='sm:hidden'>
      <Menu
        onClick={toggleOpen}
        className='relative z-50 h-7 w-7 text-pBrown ml-6 dark:text-pBrown cursor-pointer'
      />

      {isOpen ? (
        <div className='fixed animate-in slide-in-from-top-5 fade-in-20 inset-0 z-0 w-full'>
          <ul className='absolute dark:bg-banger-blue bg-pWhite dark:bg-sBlue shadow-xl grid w-full gap-3 px-8 mt-14 py-4 dark:border-t border-pBlue backdrop-blur-lg'>
            <li>
              <Link
                onClick={() =>
                  closeOnCurrent('/login')
                }
                className='flex items-center w-full font-regular text-pBrown font-title'
                href='/login'>
                <UserRoundCheck className='w-5 h-5 mr-2' />Connexion
              </Link>
            </li>
            <li>
              <Link
                onClick={() =>
                  closeOnCurrent('/register')
                }
                className='flex items-center w-full font-regular text-pBrown font-title'
                href='/register'>
                <UserRoundPlus className='w-5 h-5 mr-2' />Inscription
              </Link>
            </li>
          </ul>
        </div>
      ) : null
      }
    </div >
  )
}

export default MobileNav