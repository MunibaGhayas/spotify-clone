import React, { useState, useEffect } from "react";
import { DataValue } from "./DataLayer";
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import RepeatIcon from '@mui/icons-material/Repeat';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import { Grid, Slider } from "@mui/material";
import "./Footer.css";

function Footer({ spotify }) {
  const [{ currentTrack, playing, audioRef, currentTrackIndex, discover_weekly, searchResults }, dispatch] = DataValue();
  const [volume, setVolume] = useState(30);

  useEffect(() => {
    if (audioRef) {
      audioRef.volume = volume / 100;
    }
  }, [volume, audioRef]);

  const changeTrack = async (track, trackIndex)=>{
    if (audioRef) {
      await audioRef.pause();
      audioRef.currentTime = 0; 
    }
    const newAudio = new Audio(track.preview_url);
    dispatch({ type: "SET_AUDIO_REF", audioRef: newAudio });
    dispatch({ type: 'SET_CURRENT_TRACK', currentTrack: track });
    dispatch({ type: 'SET_CURRENT_TRACK_INDEX', currentTrackIndex: trackIndex });

    if(playing){
      newAudio.play().then(() => {
        dispatch({ type: 'SET_PLAYING', playing: true });
      })
    }
  }

  const SkipPrevious = async () => {
    const tracks = searchResults.length > 0 
      ? searchResults 
      : discover_weekly?.tracks?.items.map(item => item.track);

      console.log("Tracks:", tracks);
      console.log("Current Track Index:", currentTrackIndex);

    if (currentTrackIndex < tracks.length - 1 && currentTrackIndex !== 0) {
      const previousTrackIndex = currentTrackIndex - 1;
      const previousTrack = tracks[previousTrackIndex];
      await changeTrack(previousTrack, previousTrackIndex);   
      if(!previousTrack.preview_url){
        alert('No preview-url available.');
        return;
      }   
    }else{
      console.log(alert('Start of playlist'));
    }
  };

  const skipNext = async () => {
    const tracks = searchResults.length > 0 
      ? searchResults 
      : discover_weekly?.tracks?.items.map(item => item.track);

      console.log("Tracks:", tracks);
      console.log("Current Track Index:", currentTrackIndex);

    if (currentTrackIndex < tracks.length - 1) {
      const nextTrackIndex = currentTrackIndex + 1;
      const nextTrack = tracks[nextTrackIndex];
      await changeTrack(nextTrack, nextTrackIndex);
      if(!nextTrack.preview_url){
        alert('No preview-url available.');
        return;
      }
    }else{
      console.log(alert('End of playlist'));
    }
  };

  const handlePlay = async () => {
    if (audioRef && !playing) {
      if (!currentTrack.preview_url) {
        alert('No preview URL available for this track.');
        return;
      }
      await audioRef.play();
      dispatch({ type: "SET_PLAYING", playing: true });
    }
  };

  const handlePause = async () => {
    if (audioRef && playing) {
      await audioRef.pause();
      dispatch({ type: "SET_PLAYING", playing: false });
    }
  };

  const handleVolume = (event, newValue) => {
    setVolume(newValue);
    if (audioRef) {
      audioRef.volume = newValue / 100;
    }
  };

  return (
    <div className="footer">
      {currentTrack ? (
        <div className="footer__left">
          <img className="footer__albumLogo" src={currentTrack.album.images[0].url} alt={currentTrack.name} />
          <div className="footer__songInfo">
            <h4>{currentTrack.name}</h4>
            <p>{currentTrack.artists.map((artist) => artist.name).join(", ")}</p>
          </div>
        </div>
      ) : (
        <div className="footer__left">
          <img className="footer__albumLogo" src='' alt='' />
          <div className="footer__songInfo">
            <h4>No Song Is Playing</h4>
          </div>
        </div>
      )}

      <div className="footer__center">
        <ShuffleIcon className="footer__green" />
        <SkipPreviousIcon className="footer__icon" onClick={SkipPrevious} />
        {playing ? (
          <PauseCircleOutlineIcon
            onClick={handlePause}
            fontSize="large"
            className="footer__icon"
          />
        ) : (
          <PlayCircleOutlineIcon
            onClick={handlePlay}
            fontSize="large"
            className="footer__icon"
          />
        )}
        <SkipNextIcon className="footer__icon" onClick={skipNext}/>
        <RepeatIcon className="footer__green" />
      </div>

      <div className="footer__right">
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
            <Slider
              aria-label="Volume"
              value={volume}
              onChange={handleVolume}
              min={0}
              max={100}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;

