import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

function MovieCard() {
    const navigate = useNavigate();

    return (
        <Card variant="outlined" style={{width: '250px', height:'200px'}}>
            <CardContent>
                <Typography variant="h5" component="div" noWrap textOverflow="ellipsis">
                    Movie Name
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom noWrap textOverflow="ellipsis">
                    Year: 2018
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom noWrap textOverflow="ellipsis">
                    Rating: 3.8
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => navigate("/movie")}>MORE INFO</Button>
            </CardActions>
        </Card>
    );
}

export default MovieCard;