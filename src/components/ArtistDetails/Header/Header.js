import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.css';

export default function Header({ artist, onBackClick }) {
  return (
    <div className={styles.header}>
      <span className={styles.backButton} onClick={onBackClick} role="button" tabIndex={0}>
        <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill="#FFF" d="M24 10.5H5.7l8.4-8.4L12 0 0 12l12 12 2.1-2.1-8.4-8.4H24z" />
        </svg>
      </span>
      <div className={styles.imageWrapper}>
        <img className={styles.headerImage} src={artist.images[0].url} alt={artist.name} />
      </div>
      <div className={styles.artistDescription}>
        <div className={styles.name}>{artist.name}</div>
        <div className={styles.tags}>{artist.genres.join(', ')}</div>
      </div>
    </div>
  );
}

Header.propTypes = {
  artist: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired,
};
