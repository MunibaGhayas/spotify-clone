
export const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "9cc698ab484b4b009c536f8d3ba48570";
const redirectUri = "http://localhost:3000/";
const scopes = [
  'user-read-private',
  'user-read-email',
  'playlist-read-private',
  'user-modify-playback-state',
  'user-read-playback-state',
  'user-read-recently-played',
  'user-top-read'
];

export const getTokenFromResponse = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
};

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
