import React, { useState } from "react";
import "./Header.css";
import { DataValue} from "./DataLayer";
import { Avatar } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

function Header({ spotify }) {
  const [{ user }, dispatch] = DataValue();
  const[searchQuery, setSearchQuery] = useState("");

  const onSearch = async (e) =>{
    if(e.key === 'Enter'){
      const response = await spotify.searchTracks(searchQuery);
      dispatch({
        type: 'SET_SEARCH_RESULT',
        searchResults: response.tracks.items,
      })
        
    }
  }

  return (
    <div className="header">
      <div className="header__left">
        <SearchIcon onClick={onSearch}/>
        <input
          placeholder="Search for Artists, Songs, or Podcasts "
          type="text"
          value={searchQuery}
          onChange={(e)=> setSearchQuery(e.target.value)}
          onKeyPress={onSearch}
        />
      </div>
      <div className="header__right">
        <Avatar alt={user?.display_name} src={user?.images[0].url} />
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
}

export default Header;
