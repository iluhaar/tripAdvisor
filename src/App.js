import React, { useEffect, useState } from 'react'

import { CssBaseline, duration, Grid } from '@material-ui/core'

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map'

import { getPlacesData, getWeatherData } from './api/index.js'

const App = () => {
    const [type, setType] = useState('restaurants')
    const [rating, setRating] = useState('')

    const [coordinates, setCoordinates] = useState({})
    const [bounds, setBounds] = useState({})

    const [weatherInfo, setWeatherInfo] = useState([])
    const [filteredPlaces, setFilteredPlaces] = useState([])
    const [places, setPlaces] = useState([])

    const [placeClicked, setPlaceClicked] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude })
        })
    }, [])
    

    useEffect(() => {

        const filteredPlaces = places?.filter((place) => Number(place.rating) > rating)
        
        setFilteredPlaces(filteredPlaces)
   
    }, [rating])

    useEffect(() => {
        if (bounds.sw && bounds.ne) {
            setIsLoading(true)
            getWeatherData(coordinates.lat, coordinates.lng)
                .then((data) => setWeatherInfo(data))


            getPlacesData(type, bounds.sw, bounds.ne)
                .then((data) => {
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
                        isLoading={isLoading}
                        placeClicked={placeClicked}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        setPlaceClicked={setPlaceClicked}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        weatherInfo={weatherInfo}

                    />
                </Grid>
            </Grid>
        </>
    )
}

export default App;