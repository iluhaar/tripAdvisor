import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';
import defautlRestImg from '../../temp/img/defautlRestPhoto.jpg'

import useStyles from './style'

const PlaceDetails = ({ place, selected, refProp }) => {

    if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    const classes = useStyles()
    return (
        <>
            <Card elevation={6}>
                <CardMedia
                    style={{ height: 350 }}
                    image={place.photo ? place.photo.images.large.url : defautlRestImg}
                    title={place.name}
                />
                <CardContent>
                    <Typography gutterBottom variant='h5'>{place.name}</Typography>
                    <Box display='flex' justifyContent='space-between'>
                        <Rating value={Number(place.rating)} size='small' readOnly />
                        <Typography gutterBottom variant='subtitle1'> out of {place.num_reviews}</Typography>
                    </Box>
                    <Box display='flex' justifyContent='space-between'>
                        <Typography variant='subtitle1'>Price</Typography>
                        <Typography gutterBottom variant='subtitle1'>{place.price ? place.price : 'SRY, No price info :('}</Typography>
                    </Box>
                    <Box display='flex' justifyContent='space-between'>
                        <Typography variant='subtitle1'>Ranking</Typography>
                        <Typography gutterBottom variant='subtitle1'>{place.ranking ? place.ranking : 'SRY, No raking info :('}</Typography>
                    </Box>
                    {place?.awards?.map(award => (
                        <Box my={1} display='flex' justifyContent='space-between' align-items='center'>
                            <img src={award.images.small} alt={award.display_name} />
                            <Typography variant='subtitle2' color='textSecondary'>{award.display_name}</Typography>
                        </Box>
                    ))}
                    {place?.cuisine?.map((cuisine, i) => (
                        <Chip key={i} size='small' label={cuisine.name} className={classes.chip} />
                    ))}
                    {place?.address && (
                        <Typography gutterBottom variant='subtitle2' color='textSecondary' className={classes.subtitle}>
                            <LocationOnIcon /> {place.address}
                        </Typography>
                    )}
                    {place?.phone && (
                        <Typography  gutterBottom variant='subtitle2' color='textSecondary' className={classes.spacing}>
                            <PhoneIcon /> {place.phone}
                        </Typography>
                    )}
                    <CardActions>
                        <Button size='small' onClick={() => window.open(place.web_url, '_blank')}>Trip Advisor</Button>
                        <Button size='small' onClick={() => window.open(place.website, '_blank')}>{`Place site`}</Button>
                    </CardActions>
                </CardContent>
            </Card>
            <div>{console.log(place)}</div>
        </>
    );
}

export default PlaceDetails;
