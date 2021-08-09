import React from 'react'
import { Autocomplete } from '@react-google-maps/api'
import { AppBar, Box, InputBase, Toolbar, Typography } from '@material-ui/core'
import SearchIcon  from '@material-ui/icons/Search'
import useStyles from './style'


const Header = () => {
    const classes = useStyles();
    return (
        <AppBar>
            <Toolbar className={classes.toolbar}>
                <Typography variant='h5' className={classes.title}>
                    Hi, im a header
                </Typography>
                <Box display='flex'>
                    <Typography variant='h6' className={classes.title}>
                        Find best places to go
                    </Typography>
                    {/* <Autocomplete> */}
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase placeholder='type here..' classes={{root: classes.inputRoot, input: classes.inputInput}}/>
                    </div>

                    {/* </Autocomplete> */}

                </Box>


            </Toolbar>
        </AppBar>
    )
}
export default Header;