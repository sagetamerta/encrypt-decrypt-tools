import Head from 'next/head'

interface Props {
  title?: string
  children: React.ReactNode
  description?: string
}

const PageContainer = ({ title, description, children }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <>{children}</>
    </>
  )
}

export default PageContainer
