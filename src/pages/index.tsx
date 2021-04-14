import { GetStaticProps } from 'next';
import Head from 'next/head';

import Link from 'next/link';
import { FaCalendarAlt, FaUserCircle } from 'react-icons/fa';
import { getPrismicClient } from '../services/prismic';

import styles from './home.module.scss';

// interface Post {
//   uid?: string;
//   first_publication_date: string | null;
//   data: {
//     title: string;
//     subtitle: string;
//     author: string;
//   };
// }

// interface PostPagination {
//   next_page: string;
//   results: Post[];
// }

// interface HomeProps {
//   postsPagination: PostPagination;
// }

export default function Home() {
  return (
    <>
      <Head>
        <title>Spacetraveling</title>
      </Head>
      <section className={styles.contentHome}>
        <div className={styles.container}>
          <article className={styles.itemPost}>
            <Link href="/">
              <a className={styles.linkPost}>
                <h1>Como utilizar Hooks</h1>
                <p>Pensando em sincronização em vez de ciclos de vida.</p>
                <div className={styles.dateAutor}>
                  <span className={styles.date}>
                    <FaCalendarAlt /> 15 Mar 2021
                  </span>
                  <span className={styles.date}>
                    <FaUserCircle /> Joseph Oliveira
                  </span>
                </div>
              </a>
            </Link>
          </article>
          <article className={styles.itemPost}>
            <Link href="/">
              <a className={styles.linkPost}>
                <h1>Como utilizar Hooks</h1>
                <p>Pensando em sincronização em vez de ciclos de vida.</p>
                <div className={styles.dateAutor}>
                  <span className={styles.date}>
                    <FaCalendarAlt /> 15 Mar 2021
                  </span>
                  <span className={styles.date}>
                    <FaUserCircle /> Joseph Oliveira
                  </span>
                </div>
              </a>
            </Link>
          </article>
          <article className={styles.itemPost}>
            <Link href="/">
              <a className={styles.linkPost}>
                <h1>Como utilizar Hooks</h1>
                <p>Pensando em sincronização em vez de ciclos de vida.</p>
                <div className={styles.dateAutor}>
                  <span className={styles.date}>
                    <FaCalendarAlt /> 15 Mar 2021
                  </span>
                  <span className={styles.date}>
                    <FaUserCircle /> Joseph Oliveira
                  </span>
                </div>
              </a>
            </Link>
          </article>
          <article className={styles.itemPost}>
            <Link href="/">
              <a className={styles.linkPost}>
                <h1>Como utilizar Hooks</h1>
                <p>Pensando em sincronização em vez de ciclos de vida.</p>
                <div className={styles.dateAutor}>
                  <span className={styles.date}>
                    <FaCalendarAlt /> 15 Mar 2021
                  </span>
                  <span className={styles.date}>
                    <FaUserCircle /> Joseph Oliveira
                  </span>
                </div>
              </a>
            </Link>
          </article>
        </div>
      </section>
    </>
  );
}

// export const getStaticProps = async () => {
//   const prismic = getPrismicClient();
//   const postsResponse = await prismic.query(TODO);
//   // TODO
// };
