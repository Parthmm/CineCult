import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import config from '../config.json';

function TVShowCard(props) {
    const navigate = useNavigate();

    // Adjust the styles for the image
    const imageStyles = {
        width: '100%', // Make image take full width of the card
        height: 'auto', // Adjust height automatically
        objectFit: 'cover', // Cover the area without stretching the image
        objectPosition: 'center' // Center the image within the element
    };

    return (
        <Card variant="outlined" style={{ width: '250px', minHeight: '350px' }}>
            <CardContent>
                <div style={{ height: '300px', overflow: 'hidden' }}> {/* Container to control the image size */}
                    <img 
                        style={imageStyles}
                        src={`http://localhost:3000/${props.poster}`} 
                        alt={`${props.name} Poster`} 
                    />
                </div>
                <Typography variant="h5" component="div" noWrap textOverflow="ellipsis">
                    {props.name}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom noWrap textOverflow="ellipsis">
                    {props.seasons} Seasons, {props.episodes} Episodes
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom noWrap textOverflow="ellipsis">
                    Rating: {props.rating}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom noWrap textOverflow="ellipsis">
                    Language: {props.language}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom noWrap textOverflow="ellipsis">
                    Genre: {props.genre}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => navigate(`/tvshow/${props.id}`, { state: { id: props.id, name: props.name } })}>View Reviews</Button>
            </CardActions>
        </Card>
    );
}

export default TVShowCard;
