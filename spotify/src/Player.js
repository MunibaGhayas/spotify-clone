import React from "react";
import Footer from "./Footer";
import "./Player.css";
import Sidebar from "./Sidebar";
import Body from "./Body";

function Player({ spotify, currTrack }) {
  
  return (
    <div className="player">
      <div className="player__body">
        <Sidebar spotify={spotify}/>
        <Body spotify={spotify} />
      </div>
      <Footer currTrack={currTrack} spotify={spotify}/>
    </div>
  );
}

export default Player;
