import { Oswald, Open_Sans } from 'next/font/google'
 
export const oswald = Oswald({
  subsets: ['latin'],
  style: ['normal'],
  display: 'swap',
  weight: ['400', '700'],
})
export const open_sans = Open_Sans({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  weight: ['400', '700'],
})
