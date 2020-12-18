import React, {FC,} from 'react';
import {Router} from "./Router";
import {Container, createMuiTheme, ThemeProvider, Typography} from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import {blue, amber,red, lightGreen} from "@material-ui/core/colors";

import { makeStyles } from "@material-ui/core/styles";

const col = "#f44336"
const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      root: {
        marginLeft: "20px",
        fontFamily: 'Helvetica'
      },
      h5:{
        fontWeight: 100,
        fontFamily:'-apple-system',
        fontSize: 30,
      }
    },
    MuiAppBar:{
      root:{
        marginLeft:"10px"
      }
    },
    MuiTab:{
      root:{
        fontSize: 12,
        fontWeight: 350,
      }
    },
    MuiFab:{
      root:{
        width:45,
        height:45,
      }
    }
    
  },
  palette: {
      type: 'dark',
      primary: red,
      secondary: amber,
  },
});

const useStyles = makeStyles((theme) => ({
  toolbar: { display: "flex", justifyContent: "space-between" },
  menuButton: { marginRight: theme.spacing(2) },
  link: { textDecoration: "none" },
}));

const App: FC = props => {
  return (
    <div>
      {/* <ThemeProvider theme={logoTheme}>
        <Typography variant="h5" >Movienator</Typography>
      </ThemeProvider> */}
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Container >
          <Router/>
        </Container>
      </ThemeProvider>
    </div>
  );
}


export default App;
