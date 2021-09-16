import React from 'react';
import PropTypes from 'prop-types';
import styles from './TrackList.module.css';
import Track from './Track/Track';

export default function TrackList({ tracks }) {
  return (
    <div className={styles.trackList}>
      <h2 className={styles.heading}>Popular</h2>
      <div>
        {tracks && tracks.map((r) => (
          <Track
            key={r.id}
            track={r}
            className={styles.track}
          />
        ))}
      </div>
    </div>
  );
}

TrackList.propTypes = {
  tracks: PropTypes.array,
};

TrackList.defaultProps = {
  tracks: null,
};
