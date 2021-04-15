import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { FaCalendarAlt, FaUserCircle } from 'react-icons/fa';
import Prismic from '@prismicio/client';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { getPrismicClient } from '../services/prismic';

import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    author: string;
    subtitle: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  // posts: PostPagination;
  posts: Post[];
}

export default function Home({ posts }: HomeProps) {
  return (
    <>
      <Head>
        <title>Spacetraveling | Início</title>
      </Head>

      <section className={styles.contentHome}>
        <div className={styles.container}>
          {posts.map(post => (
            <article className={styles.itemPost} key={post.uid}>
              <Link href={`/post/${post.uid}`}>
                <a className={styles.linkPost}>
                  <h1>{post.data.title}</h1>
                  <p>{post.data.subtitle}</p>
                  <div className={styles.dateAutor}>
                    <span className={styles.date}>
                      <FaCalendarAlt />
                      {format(
                        new Date(post.first_publication_date),
                        'dd MMM yyyy',
                        {
                          locale: ptBR,
                        }
                      )}
                    </span>
                    <span className={styles.date}>
                      <FaUserCircle /> {post.data.author}
                    </span>
                  </div>
                </a>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      fetch: ['posts.title', 'posts.author', 'posts.subtitle'],
      pageSize: 20,
    }
  );

  const posts = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        author: post.data.author,
        subtitle: post.data.subtitle,
      },
    };
  });

  return {
    props: {
      posts,
    },
  };
};
