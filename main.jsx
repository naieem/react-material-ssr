import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import JssProvider from 'react-jss/lib/JssProvider';
import {MuiThemeProvider, createMuiTheme, createGenerateClassName} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

import Root from './srcx/root.jsx';

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        primary: green,
        accent: red,
        type: 'light'
    }
});

// Create a new class name generator.
const generateClassName = createGenerateClassName();

ReactDOM.hydrate(
    <JssProvider generateClassName={generateClassName}>
    <MuiThemeProvider theme={theme}>
        <BrowserRouter>
            <Root></Root>
        </BrowserRouter>
    </MuiThemeProvider>
</JssProvider>, document.getElementById('app'));