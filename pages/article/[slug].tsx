import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { fetchArticle } from '../../utils/fetchFunctions';

import NotFound from '../../components/NotFound/NotFound';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import TripGallery from '../../components/TripGallery/TripGallery';

import styles from './ArticlePage.module.scss';

import { ArticleEntry } from '../../types';

const ArticlePage = () => {
  const [article, setArticle] = useState<ArticleEntry>();
  const [notFound, setNotFound] = useState(false);

  const { slug } = useRouter().query;

  useEffect(() => {
    const getArticle = async () => {
      if (typeof slug === 'string') {
        const article = await fetchArticle(slug);

        if (article) {
          setArticle(article);
        } else {
          setNotFound(true);
        }
      }
    };

    getArticle();
  }, [slug]);

  if (notFound) {
    return <NotFound />;
  }

  if (!article) {
    return <LoadingSpinner />;
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

export default ArticlePage;
