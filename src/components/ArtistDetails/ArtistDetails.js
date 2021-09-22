import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import SpotifyAPI from '../../services/SpotifyAPI';
import Content from './Content/Content';
import TrackList from './TrackList/TrackList';
import AlbumList from './AlbumList/AlbumList';
import Header from './Header/Header';
import styles from './ArtistDetails.module.css';

function ArtistDetails({
  artists, history, location, match, token,
}) {
  const [topTracks, setTopTracks] = useState(null);
  const [albums, setAlbums] = useState(null);

  useEffect(() => {
    if (location && location.state && location.state.position) {
      const { left, top } = location.state.position;
      const offsetLeft = 100;
      const offsetTop = 30;
      const x = left - offsetLeft;
      const y = top - offsetTop;

      document.documentElement.style.setProperty('--translate-header-image', `translate(${x}px, ${y}px) scale(0.8)`);
    }
  }, []);

  useEffect(() => {
    const artistId = match.params.id;

    SpotifyAPI.fetchTopTracks(artistId, token).then(({ tracks }) => {
      setTopTracks(tracks);
    });

    SpotifyAPI.fetchAlbums(artistId, token).then(({ items }) => {
      setAlbums(items);
    });
  }, []);

  useEffect(() => {
    if (location.state) {
      window.history.replaceState(null, '');
    }

    window.scrollTo(0, 0);
  }, []);

  const handleGoBackClick = useCallback((() => {
    history.push('/', {
      position: location.state ? location.state.position : null,
      artistId: location.state ? location.state.artistId : null,
    });
  }), [location, history]);

  const artist = useMemo(
    () => (artists ? artists.find((a) => a.id === match.params.id) : null),
    [artists, match.params.id],
  );

  if (!artist) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Header artist={artist} onBackClick={handleGoBackClick} />
      <Content>
        <AlbumList albums={albums} />
        <TrackList tracks={topTracks} />
      </Content>
    </div>
  );
}

ArtistDetails.propTypes = {
  artists: PropTypes.array,
  token: PropTypes.string.isRequired, // todo move outside
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

ArtistDetails.defaultProps = {
  artists: null,
};

export default withRouter(ArtistDetails);
