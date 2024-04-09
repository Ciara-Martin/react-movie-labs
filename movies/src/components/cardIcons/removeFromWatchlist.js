import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromWatchlistIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleRemoveFromWatchlist = (e) => {
    e.preventDefault();
    context.removeFromWatchlist(movie);
  };
  return (
    <IconButton
      aria-label="remove from Watchlist"
      onClick={handleRemoveFromWatchlist}
    >
      <DeleteIcon style={{ color: '#ad96e0' }} fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromWatchlistIcon;