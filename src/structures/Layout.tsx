import { ReactNode } from 'react';
import Head from 'next/head'
import { Footer } from '../components/Footer'

type ILayoutProps= {
  children: ReactNode
}

export default function Layout({ children }: ILayoutProps) {

  return (
    <>
      <Head>
        <title>Portfolio NAVARRO Benjamin</title>
        <meta name="description" content="Navarro Benjamin Portfolio" />
        <link rel="icon" href="/icon.svg" />
      </Head>

      <main className={'main'}>
        {children}
      </main>

      <Footer />
    </>
  )
}
