import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
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

  const options = {
    renderNode: {
      'embedded-asset-block': node => `<img src="${node.data.target.fields.file.url}"/>`,
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

        <div
          className={styles.contentWrapper}
          dangerouslySetInnerHTML={{ __html: documentToHtmlString(article.body, options) }}
        />
      </section>

      <TripGallery />
    </>
  );
};

export default ArticlePage;
