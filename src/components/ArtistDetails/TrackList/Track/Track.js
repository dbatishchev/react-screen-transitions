import React from 'react';
import PropTypes from 'prop-types';
import styles from './Track.module.css';
import formatDuration from '../../../../utils/formatDuration';

export default function Track({ track, className }) {
  return (
    <div className={`${styles.track} ${className}`}>
      <img className={styles.image} src={track.album.images[2].url} />
      <span>
        <span className={styles.title}>{track.name}</span>
        <span className={styles.album}>{track.album.name}</span>
      </span>
      <span className={styles.duration}>{formatDuration(track.duration_ms)}</span>
    </div>
  );
}

Track.propTypes = {
  track: PropTypes.object.isRequired,
  className: PropTypes.string,
};

Track.defaultProps = {
  className: '',
};
