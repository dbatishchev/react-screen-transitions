import React from 'react';
import PropTypes from 'prop-types';
import styles from './Album.module.css';

export default function Album({ album, className }) {
  return (
    <div className={`${styles.album} ${className}`}>
      <img className={styles.image} src={album.images[1].url} alt={album.name} />
      <span className={styles.title}>{album.name}</span>
    </div>
  );
}

Album.propTypes = {
  album: PropTypes.object.isRequired,
  className: PropTypes.string,
};

Album.defaultProps = {
  className: '',
};
