import React, { useState, useEffect, createRef } from 'react'
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

import PlaceDetails from '../PlaceDetails/PlaceDetails';
import useStyles from './style.js';



const List = ({ places, placeClicked, isLoading }) => {
    const [type, setType] = useState('restarants')
    const [rating, setRating] = useState('')
    const [elRefs, setElRefs] = useState([]);

    const classes = useStyles();

    useEffect(() => {
        setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
      }, [places]);

    console.log({ placeClicked })
    return (
        <div className={classes.container}>
            <Typography variant='h4'>Places near you</Typography>
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress   size="5rem" />
                </div>

            ) : (
                <>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Type</InputLabel>
                        <Select value={type} onChange={(e) => setType(e.target.value)}>
                            <MenuItem value='restarants'>Restarants</MenuItem>
                            <MenuItem value='hotels'> Hotels</MenuItem>
                            <MenuItem value='attractions'>Attractions</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Rating</InputLabel>
                        <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                            <MenuItem value={0}>All</MenuItem>
                            <MenuItem value={3}>Above 3</MenuItem>
                            <MenuItem value={4}>Above 4</MenuItem>
                            <MenuItem value={4.5}>Above 4.5</MenuItem>
                        </Select>
                    </FormControl>
                    <Grid container spacing={3} className={classes.list}>
                        {places?.map((place, i) => (
                            <Grid item key={i} xs={12}>
                                <PlaceDetails place={place} selected={placeClicked === i} refProp={elRefs[i]} />
                            </Grid>
                        ))}
                    </Grid>
                </>)}
        </div>
    )
}
export default List;