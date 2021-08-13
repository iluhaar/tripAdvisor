import React, { useEffect, useState } from 'react'

import { CssBaseline, duration, Grid } from '@material-ui/core'

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map'

import { getPlacesData } from './api/index.js'

const App = () => {
    const [type, setType] = useState('restaurants')
    const [rating, setRating] = useState('')

    const [coordinates, setCoordinates] = useState({})
    const [bounds, setBounds] = useState({})

    const [weatherInfo, setWeatherInfo] = useState([])
    const [filteredPlaces, setFilteredPlaces] = useState([])
    const [places, setPlaces] = useState([])

    const [placeClicked, setplaceClicked] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude })
        })
    }, [])
    

    useEffect(() => {
        const filteredPlaces = places.filter((place) => Number(place.rating) > rating)
        setFilteredPlaces(filteredPlaces)
    }, [rating])

    useEffect(() => {
        if (bounds.sw && bounds.ne) {
            setIsLoading(true)
            getPlacesData(type, bounds.sw, bounds.ne)
                .then((data) => {
                    console.log(data)
                    setPlaces(data?.filter((place) => place.name && place.num_reviews > 0))
                    setFilteredPlaces([])
                    setRating('')
                    setIsLoading(false)
                })
        }
    }, [type, bounds])

    return (
        <>
            <CssBaseline />
            <Header setCoordinates={setCoordinates} />
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List
                        placeClicked={placeClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                        places={filteredPlaces.length ? filteredPlaces : places}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        setplaceClicked={setplaceClicked}
                        places={filteredPlaces.length ? filteredPlaces : places}

                    />
                </Grid>
            </Grid>
        </>
    )
}

export default App;