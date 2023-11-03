import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

function MovieCard(props) {
    const navigate = useNavigate();

    return (
        <Card variant="outlined" style={{ width: '250px', height: '200px' }}>
            <CardContent>
                <Typography variant="h5" component="div" noWrap textOverflow="ellipsis">
                    {props.name}
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
                <Button size="small" onClick={() => navigate("/movie", { state: { key: props.id } })}>View Reviews</Button>
            </CardActions>
        </Card>
    );
}

export default MovieCard;