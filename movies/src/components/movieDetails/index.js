import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews"


const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

useEffect(() => {
  const fetchRecommendations = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/recommendations?api_key=${process.env.REACT_APP_TMDB_KEY}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }
      const data = await response.json();
      setRecommendations(data.results);
    } catch (error) {
      console.error("Error fetching recmmendations:", error);
    }
  };
  fetchRecommendations();
}, [movie.id]);

  return (
    <>
      <Paper elevation={1} style={{ padding: 20, marginBottom: 20 }}>
        <Typography variant="h4" component="h3">
          Overview
        </Typography>

        <Typography variant="h6" component="p">
          {movie.overview}
        </Typography>
      </Paper>

      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Genres" sx={{...chip}} style={{ color: '#ad96e0' }} />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{...root}}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count}`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>
      <Fab
        style={{ background: '#ad96e0' }}
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>

      <Typography varient="h5" component="h3">
        Recommendations
      </Typography>
      <div style={{display: "flex", flewWrap: "wrap", gap: "10px"}}>
        {recommendations.map((recommendation)=> (
          <img
          key={recommendation.id}
          src={`https://image.tmdb.org/t/p/w300${recommendation.poster_path}`}
          alt={recommendation.title}
          style={{ width: "200px", height: "300px"}}
          />
        ))}
      </div>
      </>
  );
};
export default MovieDetails ;