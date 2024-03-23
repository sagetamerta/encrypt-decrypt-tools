import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
      <Toaster position="top-right" />
    </ThemeProvider>
  )
}

export default (props: AppProps) => <App {...props} />
