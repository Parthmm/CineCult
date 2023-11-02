import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

function TVShowCard() {
    const navigate = useNavigate();

    return (
        <Card variant="outlined" style={{width: '250px', height:'200px'}}>
            <CardContent>
                <Typography variant="h5" component="div" noWrap textOverflow="ellipsis">
                    TV Show Name
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom noWrap textOverflow="ellipsis">
                    Year: 2014
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom noWrap textOverflow="ellipsis">
                    3 Seasons, 30 Episodes
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom noWrap textOverflow="ellipsis">
                    Rating: 4.8
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => navigate("/tv-show")}>MORE INFO</Button>
            </CardActions>
        </Card>
    );
}

export default TVShowCard;