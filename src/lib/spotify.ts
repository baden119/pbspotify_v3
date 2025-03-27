import SpotifyWebApi from 'spotify-web-api-node';

// TODO Check on Vercel that these values are secure, add a gitignore or whatever
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

export default spotifyApi;