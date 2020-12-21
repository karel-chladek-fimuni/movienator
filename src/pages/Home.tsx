import { Button, Card, CardContent, Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import React from 'react';
import img from '../images/Movienator-01.svg'
import image2 from '../images/HomeImage.png'


const useStyles = makeStyles((theme: Theme) => ({
    margin: {
        marginTop: "2rem",


    },
  }));

export const Home = ()=>{
    const classes = useStyles();
    return (
    <div style={{ backgroundImage:  `url(${image2})`, 
                backgroundRepeat: "no-repeat",
                backgroundPositionX:"100%",
                backgroundPositionY:"1rem",
                backgroundSize: "35% ",
                }}>

        <Grid container style={{width:"100%", height:"100%",minHeight:"25rem"}}>
            <Grid item xs={12}>
            <Typography variant='h3' className={classes.margin} align='center'>Welcome to </Typography>
            <Typography variant='h1' style = {{marginTop:"1rem"}} align='center' color= "primary">Movienator</Typography>
            <Typography variant='body1' style = {{fontWeight:"100"}} align='center'>Place, where anyone can find a perfect movie to watch</Typography>

        </Grid>
        
    </Grid>
    </div>
        
    );
}