import React from 'react';
import PropTypes from 'prop-types';
import styles from './AlbumList.module.css';
import Album from './Album/Album';

export default function AlbumList({ albums }) {
  return (
    <div className={styles.container}>
      {albums && albums.map((a) => (
        <Album
          album={a}
          key={a.id}
          className={styles.album}
        />
      ))}
    </div>
  );
}

AlbumList.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object), // todo
};

AlbumList.defaultProps = {
  albums: null,
};
