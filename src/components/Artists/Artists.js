import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ArtistPhoto from './ArtistPhoto/ArtistPhoto';
import styles from './Artists.module.css';

function Artists({ location, artists }) {
  useEffect(() => {
    if (!location || !location.state || !location.state.position || !location.state.artistId) {
      return;
    }

    const rootEl = document.documentElement;
    const { top, left } = location.state.position;

    const offsetLeft = 100;
    const offsetTop = 30;

    const x = -(left - offsetLeft);
    const y = -(top - offsetTop);
    rootEl.style.setProperty('--translate-tile', `translate(${x}px, ${y}px) scale(1.2632)`);

    if (location.state) {
      window.history.replaceState(null, '');
    }
  }, []);

  if (!artists) {
    return null;
  }

  if (artists.length === 0) {
    return 'Nothing Found';
  }

  const artistId = location && location.state ? location.state.artistId : null;

  return (
    <div className={styles.artists}>
      <div className={styles.tiles}>
        {artists.map((a) => (
          <ArtistPhoto
            artist={a}
            className={`${styles.tile} ${a.id === artistId ? styles.tileSlideIn : ''}`}
            key={a.id}
          />
        ))}
      </div>
    </div>
  );
}

Artists.propTypes = {
  artists: PropTypes.array,
  location: PropTypes.object.isRequired,
};

Artists.defaultProps = {
  artists: null,
};

export default withRouter(Artists);
