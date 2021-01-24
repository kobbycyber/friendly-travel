import React from 'react';
import Link from 'next/link';
import { getSlug } from '../../utils/helpFunctions';

import styles from './ArticleCard.module.scss';
import { ArticleEntry } from '../../types';

interface ArticleCardProps {
  article: ArticleEntry;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <Link href={`/article/${getSlug(article.title)}`}>
      <a className={styles.articleWrapper} style={{ backgroundImage: `url(${article.imageUrl})` }}>
        <h1 className={styles.heading}>{article.title}</h1>
      </a>
    </Link>
  );
};

export default ArticleCard;
