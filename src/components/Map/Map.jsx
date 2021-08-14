import React from 'react'
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
import defaultRestImg from '../../temp/img/defautlRestPhoto.jpg'
import mapStyles from './mapStyle'
import useStyles from './style'

const Map = ({ coordinates, setCoordinates, setBounds, places, setPlaceClicked, weatherInfo }) => {

    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');
    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={{disableDefaultUI: true, zoomControl:true}}
                onChange={(e) => {
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng })
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
                }}
                onChildClick={(child) => setPlaceClicked(child)}
            >

                {places?.map((place, index) => (
                    <div className={classes.markerContainer} key={index}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                    >
                        {
                            !isDesktop ? (
                                <LocationOnOutlinedIcon color='primary' fontSize='large' />
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography className={classes.typography} variant='subtitle' gutterBottom>
                                        {place.name}
                                    </Typography>
                                    <img
                                        className={classes.pointer}
                                        src={place.photo ? place.photo.images.large.url : defaultRestImg}
                                        alt={place.name}
                                    />
                                    <Rating value={Number(place.rating)} size='small' readOnly />
                                </Paper>
                            )
                        }
                    </div>
                ))}
                {weatherInfo?.list?.map((data, i) => (
                    <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
                        <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="70px" alt='Weather Info'/>
                         </div>
                ) )}
            </GoogleMapReact>
        </div>

    )
}
export default Map;