import React, { useRef } from "react";
import "./SongRow.css";
import { DataValue } from "./DataLayer";

function SongRow({ track }) { 
  const [ , dispatch] = DataValue();
  const audioRef = useRef(null)

  const playSong = () => {
    dispatch({
      type: "SET_CURRENT_TRACK",
      currentTrack: track,
    });
    dispatch({
      type: "SET_AUDIO_REF",
      audioRef: audioRef.current,
    })

  };

  return (
    <div className="songRow" onClick={playSong} >
      <img className="songRow__album" src={track.album.images[0].url} alt={`${track.album.name}`}/>
      <div className="songRow__info">
        <h1>{track.name}</h1>
        <p style={{color: "black", fontWeight: "bold"}}>
          {track.artists.map((artist) => artist.name).join(", ")} -{" "}
          {track.album.name}
        </p>
        {track.preview_url && (
          <audio controls ref={audioRef}>
            <source src={track.preview_url} type="audio/mpeg"></source>
          </audio>
        )}
        {!track.preview_url && <p style={{color: "black"}}>No preview available</p>}
      </div>
    </div>
  );
}

export default SongRow;
