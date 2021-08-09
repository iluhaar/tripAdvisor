import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

import useStyles from './style'

const PlaceDetails = ({place}) => {

    const classes = useStyles()
    return (
        <>
         {/* <Card elevation={6}>
             <CardMedia 
             style={{height:350}}
             image={place.photo ? place.photo.image.large.url : 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHJlc3RhdXJhbnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'}
             title={place.name}
             />
             <CardContent> 
                 <Typography gutterBottom variant='h5'>{place.name}</Typography>
             </CardContent>
         </Card> */}
        <div>{place.name}</div>
        <div>{console.log(place)}</div>
        </>
        );
}

export default PlaceDetails;
