import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import SpotifyAPI from '../../services/SpotifyAPI';
import ArtistDetails from '../ArtistDetails/ArtistDetails';
import Artists from '../Artists/Artists';
import './App.module.css';

function App({ location, token }) {
  const [topArtists, setTopArtists] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    SpotifyAPI.fetchTopArtists(token).then((topArtistsResponse) => {
      setTopArtists(topArtistsResponse.items);
    });
  }, []);

  if (!token) {
    return null;
  }

  return (
    <TransitionGroup>
      <CSSTransition timeout={800} classNames="main" key={location.key}>
        <Switch location={location}>
          <Route exact path="/" render={() => <Artists artists={topArtists} token={token} />} />
          <Route exact path="/artist/:id" render={() => <ArtistDetails artists={topArtists} token={token} />} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
}

App.propTypes = {
  token: PropTypes.string,
  location: PropTypes.object.isRequired,
};

App.defaultProps = {
  token: null,
};

export default withRouter(App);
