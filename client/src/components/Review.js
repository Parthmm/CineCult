import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import styles from "../styles/Dashboard.module.css"


function Review(props) {

    const cardStyle = {
        backgroundColor: props.isReviewer ? 'yellow' : 'inherit',
    };

    return (
        <div className={styles.dashboard_card}>

            <Card variant="outlined" style={cardStyle} >
                <CardContent>
                    <Typography variant="h5" component="div" noWrap textOverflow="ellipsis">
                        {props.username}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Review: {props.review}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Rating: {props.rating}
                    </Typography>
                </CardContent>

                {props.isUser && (
                    <CardActions>

                        <Button size="small" onClick={props.deleteReview}>Delete Review</Button>
                    </CardActions>
                )}
            </Card>


        </div >
    );
}

export default Review;