import React from "react";
import "./Sidebar.css";
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import logo from "./logo.webp";
import { DataValue } from "./DataLayer";
import SidebarOption from "./SidebarOption";

function Sidebar({ spotify }) {
  const [{ playlists, favorites}, dispatch] = DataValue();

  const handlePlaylistClick = (playlistId) => {
    if (!playlistId) {
      console.error("Playlist ID is undefined");
      return;
    }
    spotify.getPlaylist(playlistId).then((res) => {
      dispatch({
        type: "SET_DISCOVER_WEEKLY",
        discover_weekly: res,
      });
      dispatch({
        type: "SET_CURRENT_TRACK",
        currentTrack: null,
      })
      dispatch({ type: "CLEAR_SEARCH_RESULTS" });
        
    }).catch((error) => {
      console.error("Error fetching playlist:", error);
    });
  };
  
  return (
    <div className="sidebar">
      <img className="sidebar__logo" src={logo} alt="" />
      <SidebarOption Icon={HomeIcon} option="Home" />
      <SidebarOption Icon={SearchIcon} option="Search" />
      <SidebarOption Icon={LibraryMusicIcon} option="Your Library" />
      <br />
      <strong className="sidebar__title">PLAYLISTS</strong>
      <hr />
      {playlists?.items?.map((playlist) => (
        <SidebarOption 
          option={playlist.name} 
          key={playlist.id} 
          onClick={() => handlePlaylistClick(playlist.id)} 
        />
      ))}
      <strong className="favorite">FAVORITES</strong>
      <hr/>
      {favorites.map((track, index) => (
        <SidebarOption option={track.name} key={index}/>
      ))}
    </div>
  );
}

export default Sidebar;
