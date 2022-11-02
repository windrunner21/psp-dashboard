import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Index.module.css'

const Index: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Contents | Odero</title>
        <meta name="contents" content="Contents page for the merchant odero website." />
        <link rel="icon" href="/odero.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://odero.az">Odero.az!</a>
        </h1>

        <h3 className={styles.subtitle}>Site is currently under construction.</h3>
        <div className={styles.grid}>
          <div className={styles.link}>
            <Link href="/login">Login</Link>
          </div>

          <div className={styles.link}>
            <Link href="/onboard">Onboard</Link>
          </div>

          <div className={styles.link}>
            <Link href="/home">Dashboard</Link>
          </div>

          <div className={styles.link}>
            <Link href="/error">404 Page</Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Index
