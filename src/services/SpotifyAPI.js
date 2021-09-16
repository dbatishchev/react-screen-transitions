// todo jsdocs
// todo drop classes

const SPOTIFY_API_BASE_URL = 'https://api.spotify.com';
const SPOTIFY_API_VERSION = 'v1';

export default class SpotifyAPI {
  static redirectToAuthPage() {
    window.location.replace(`https://accounts.spotify.com/authorize?scope=user-top-read&response_type=token&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.REACT_APP_REDIRECT_URI)}`);
  }

  static fetchTopArtists(token) {
    return fetch(`${SPOTIFY_API_BASE_URL}/${SPOTIFY_API_VERSION}/me/top/artists?limit=100&time_range=long_term`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json())
      .then(SpotifyAPI.checkErrors);
  }

  static fetchTopTracks(artistId, token) {
    return fetch(`${SPOTIFY_API_BASE_URL}/${SPOTIFY_API_VERSION}/artists/${artistId}/top-tracks?country=US`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(SpotifyAPI.checkErrors);
  }

  static fetchAlbums(artistId, token) {
    return fetch(`${SPOTIFY_API_BASE_URL}/${SPOTIFY_API_VERSION}/artists/${artistId}/albums?limit=5`, { // todo raise the limit
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(SpotifyAPI.checkErrors);
  }

  /**
   * @private
   */
  static checkErrors(response) {
    if (response.error && response.error.status === 401) {
      localStorage.setItem('token', null);
      window.location.reload();
    }

    return response;
  }
}
