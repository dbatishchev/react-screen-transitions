import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styles from './ArtistPhoto.module.css';

function ArtistPhoto({ artist, history, className }) {
  const imgRef = useRef(null);

  const handleClick = useCallback((() => {
    const el = imgRef.current;
    const { x, y } = el.getBoundingClientRect();
    const position = { left: x, top: y };
    history.push(`/artist/${artist.id}`, { position, artistId: artist.id });

    el.style.opacity = 0;
  }), [artist, imgRef.current]);

  return (
    <img
      className={`${styles.image} ${className}`}
      src={artist.images[0].url}
      onClick={handleClick}
      ref={imgRef}
      alt={artist.name}
    />
  );
}

ArtistPhoto.propTypes = {
  artist: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  className: PropTypes.string,
};

ArtistPhoto.defaultProps = {
  className: '',
};

export default withRouter(ArtistPhoto);
