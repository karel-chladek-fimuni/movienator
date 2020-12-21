import { Grid, Typography } from '@material-ui/core';
import React from 'react';
export const Home = ()=>{
    return (
    <Grid container style={{width:"100%", height:"100%",minHeight:"25rem"}}>
        <Grid item xs={12}>
            <Typography>Welcome to Movienator</Typography>
        </Grid>
    </Grid>
        
    );
}