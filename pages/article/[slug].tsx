import React from 'react';
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { server } from '../../config/index';

import NotFound from '../../components/NotFound/NotFound';
import TripGallery from '../../components/TripGallery/TripGallery';

import styles from './ArticlePage.module.scss';

import { ArticleEntry } from '../../types';

interface ArticlePageProps {
  article: ArticleEntry;
}

const ArticlePage = ({ article }: ArticlePageProps) => {
  if (!article.title) {
    return <NotFound />;
  }

  const options: Options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
      [BLOCKS.EMBEDDED_ASSET]: node => <img src={node.data.target.fields.file.url} />,
    },
  };

  return (
    <>
      <section className={styles.articleWrapper}>
        <div className={styles.description}>
          <h1>{article.title}</h1>
          <p>{article.description}</p>
        </div>
        <img className={styles.heroImage} src={article.imageUrl} />

        <div className={styles.contentWrapper}>
          {documentToReactComponents(article.body, options)}
        </div>
      </section>

      <TripGallery />
    </>
  );
};

export async function getServerSideProps(context: any) {
  const slug = context.query.slug;
  const res = await fetch(`${server}/api/articles/${slug}/`);
  const article = await res.json();
  const props: ArticlePageProps = { article };
  return { props };
}

export default ArticlePage;
