import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home | Odero</title>
        <meta name="home" content="Home page for the merchant odero website." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://odero.az">Odero.az!</a>
        </h1>

        <h3>Site is currently under construction</h3>
        <div className={styles.grid}>
          <div className={styles.link}>
            <Link href="/login">Login</Link>
          </div>

          <div className={styles.link}>
            <Link href="/onboard">Onboard</Link>
          </div>

          <div className={styles.link}>
            <Link href="/error">404 Page</Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
