
export const initialState = {
  user: null,
  playlists: [],
  spotify: null,
  discover_weekly: null,
  top_artists: null,
  playing: false,
  item: null,
  currentTrack: null,
  audioRef: null,
  token: null,
  playedTracks: [],
  searchResults: [],
  favorites: [],
  currentTrackIndex: 0,
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "SET_PLAYING":
      return {
        ...state,
        playing: action.playing,
      };
    case "SET_PLAYED_TRACK":
      return{
        ...state,
        playedTracks: [...state.playedTracks, action.playedTracks]
      };

    case "SET_ITEM":
      return {
        ...state,
        item: action.item,
      };

    case "SET_DISCOVER_WEEKLY":
      return {
        ...state,
        discover_weekly: action.discover_weekly,
      };
    case "SET_SEARCH_RESULT":
      return{
        ...state,
        searchResults: action.searchResults,
      }

    case "CLEAR_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: [], 
      };
    case "SET_FAVORITES":
      return {
        ...state,
        favorites: [...state.favorites, action.track],
      };
    case "SET_TOP_ARTISTS":
      return {
        ...state,
        top_artists: action.top_artists,
      };

    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "SET_AUDIO_REF":
      return {
        ...state,
        audioRef: action.audioRef,
      };

    case "SET_SPOTIFY":
      return {
        ...state,
        spotify: action.spotify,
      };

    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    case "SET_CURRENT_TRACK_INDEX":
      return{
        ...state,
        currentTrackIndex: action.currentTrackIndex,
      }
    case "SET_CURRENT_TRACK":
      return {
        ...state,
        currentTrack: action.currentTrack,
      };
    default:
      return state;
  }
};

export default reducer;
