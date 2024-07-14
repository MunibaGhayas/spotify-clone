
import React, { useEffect } from "react";
import "./Body.css";
import Header from "./Header";
import { DataValue } from "./DataLayer";
import SongRow from "./SongRow";
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function Body({ spotify }) {
  const [{ discover_weekly, currentTrack, searchResults, playing, audioRef }, dispatch] = DataValue();

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await spotify.getPlaylist('37i9dQZEVXcJZyENOWUFo7');
        dispatch({
          type: "SET_ITEM",
          item: response,
        });
        dispatch({
          type: "SET_CURRENT_TRACK",
          currentTrack: null,
        });
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    };

    if (!searchResults.length) {
      fetchPlaylist();
    }
  }, [spotify, dispatch, searchResults.length]);

  const handlePlay = ()=>{
    if(audioRef){
      if(playing){
        audioRef.pause();
      } else{
        audioRef.play();
      }
    }
    dispatch({
      type: 'SET_PLAYING',
      playing: !playing,
    })
  }

  const addToFavorites = () => {
    if (currentTrack) {
      dispatch({
        type: "SET_FAVORITES",
        track: currentTrack,
      });
    }
  };

  return (
    <div className="body">
      <Header spotify={spotify} />
      <div className="body__info">
        {currentTrack ? (
          <>
            <img src={currentTrack.album.images[0]?.url} alt="" />
            <div className="body__infoText">
              <strong>Now Playing</strong>
              <h2>{currentTrack.name}</h2>
              <p>{currentTrack.artists.map((artist) => artist.name).join(', ')}</p>
            </div>
          </>
        ) : (
          <>
            <img src={discover_weekly?.images[0]?.url} alt="" />
            <div className="body__infoText">
              <strong>PLAYLIST</strong>
              <h2>{discover_weekly?.name}</h2>
              <p>{discover_weekly?.description}</p>
            </div>
          </>
        )}
      </div>

      <div className="body__songs">
        <div className="body__icons">
          <PlayCircleFilledIcon
            className="body__shuffle"
            onClick={handlePlay}
          />
          <FavoriteIcon className="fav" fontSize="large" onClick={addToFavorites} />
          <MoreHorizIcon />
        </div>
        {searchResults.length > 0 ? (
          searchResults.map((track, index) => (
            <SongRow key={track.id} track={track} index={index}/>
          ))
        ) : (
          discover_weekly?.tracks?.items?.map((item, index) => (
            <SongRow key={item.track.id} track={item.track} index={index} />
          ))
        )}
      </div>
    </div>
  );
}

export default Body;
