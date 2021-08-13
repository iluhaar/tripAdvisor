import React, { useEffect, useState } from 'react'

import { CssBaseline, Grid } from '@material-ui/core'

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map'

import { getPlacesData } from './api/index.js'

const App = () => {
    const [places, setPlaces] = useState([])
    const [placeClicked, setplaceClicked] = useState(null)
    const [coordinates, setCoordinates] = useState({})
    const [bounds, setBounds] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude })
        })
    }, [])

    useEffect(() => {
        // debugger
        setIsLoading(true)
        getPlacesData(bounds.sw, bounds.ne)
            .then((data) => {
                console.log(data)
                setPlaces(data)
                setIsLoading(false)
            })
    }, [bounds, coordinates])

    return (
        <>
            {console.log(bounds)}
            {console.log(coordinates)}
            <CssBaseline />
            <Header />
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List places={places}
                        placeClicked={placeClicked}
                        isLoading={isLoading} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={places}
                        setplaceClicked={setplaceClicked}

                    />
                </Grid>
            </Grid>
        </>
    )
}

export default App;