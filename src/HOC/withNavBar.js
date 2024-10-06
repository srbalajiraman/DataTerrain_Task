import { Grid, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import SideNavBar from '../components/navbars/sideNavbar';
import TopNavbar from '../components/navbars/topNavbar';
import { useStyles } from './style';

const WithNavBar = (WrappedComponent) => {
    return function HOC(props) {
        const classes = useStyles();
        const theme = useTheme()
        const isXS = useMediaQuery(theme.breakpoints.only('xs'))

        return (
            <div className=''>
                <TopNavbar />
                <div className={classes.content}>
                    <Grid container>
                        {!isXS && <Grid item xs={1} sm={1} md={1} lg={0.75} xl={0.50}>
                            <SideNavBar />
                        </Grid>}
                        <Grid item xs={isXS ? 12 : 11} sm={11} md={11} lg={11.25} xl={11.50} 
                            sx={{ height: "calc(100vh - 100px)", overflow: "auto" }}>
                            <WrappedComponent {...props} />
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    };
};

export default WithNavBar;
