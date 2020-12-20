import React, {FC,} from 'react';
import {Router} from "./Router";
import {Container, createMuiTheme, ThemeProvider} from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import {amber,red} from "@material-ui/core/colors";

import { BrowserRouter } from 'react-router-dom';

const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      root: {
        marginLeft: "20px",
        fontFamily: 'Helvetica'
      },
      h4:{
        fontWeight: 100,
        fontFamily:'-apple-system',
        fontSize: 30,
      },
      h5:{
        fontWeight: 600,
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

const App: FC = props => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Container >
          <Router/>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}


export default App;
