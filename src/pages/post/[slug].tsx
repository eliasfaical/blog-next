import Head from 'next/head';
import Prismic from '@prismicio/client';
import { FaCalendarAlt, FaUserCircle } from 'react-icons/fa';
import { GetStaticPaths, GetStaticProps } from 'next';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

// Service
import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../services/prismic';

// Styles
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{post.data.title} | Spacetraveling</title>
      </Head>

      <main className={styles.contentHome}>
        <div className={styles.container}>
          <section className={styles.itemPost}>
            <h1>{post.data.title}</h1>
            <div className={styles.dateAutor}>
              <span className={styles.date}>
                <FaCalendarAlt />

                {format(new Date(post.first_publication_date), 'dd MMM yyyy', {
                  locale: ptBR,
                })}
              </span>
              <span className={styles.date}>
                <FaUserCircle /> {post.data.author}
              </span>
            </div>

            <article className={styles.contentPost}>
              {post.data.content.map(contentPost => (
                <div key={contentPost.heading}>
                  <h2>{contentPost.heading}</h2>
                  <div
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      __html: RichText.asHtml(contentPost.body),
                    }}
                  />
                </div>
              ))}
            </article>
          </section>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query(
    [Prismic.Predicates.at('document.type', 'posts')],
    {
      fetch: ['post.uid'],
      pageSize: 100,
    }
  );

  const postsPaths = posts.results.map(post => {
    return {
      params: {
        slug: post.uid,
      },
    };
  });

  return {
    paths: postsPaths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID('posts', String(slug), {});

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      author: response.data.author,
      banner: {
        url: response.data.banner.url,
      },
      content: response.data.content,
    },
  };

  return {
    props: {
      post,
    },
  };
};
