import Head from 'next/head'
import React, { FC } from 'react'

interface Props {
  title: string
  description?: string
}

const SEO: FC<Props> = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="sagetamerta" />
      <meta name="robots" content="index, follow" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      {/* icon */}
      <link rel="icon" href="/icon.png" />
      <meta
        name="keywords"
        content="encrypt, dencrypt, tools, encryption, decryption, textcrypt"
      />
      <meta name="viewport" content="initial-scale=1, width=device-width" />

      <meta property="og:title" content={title ?? 'TextCrypt'} />
      <meta property="og:description" content={description ?? ''} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="/" />
      <meta property="og:image" content="/icon.png" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title ?? 'TextCrypt'} />
      <meta name="twitter:description" content={description ?? ''} />
      <meta name="twitter:image" content="/public/icon.png"></meta>
    </Head>
  )
}

export default SEO
