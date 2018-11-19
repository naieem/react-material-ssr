import fs from 'fs';
import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter, Route, Link} from 'react-router-dom';
/* ssr material ui */
import {SheetsRegistry} from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {MuiThemeProvider, createMuiTheme, createGenerateClassName} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
/* ssr material ui end */

import Root from './srcx/root.jsx';
const PORT = process.env.PORT || 3006;
const app = express();
/* ----------  renaming html files name --------------- */
fs.rename('./bundle/index.html', './bundle/main.html', (err) => {
    if (err) throw err;
    console.log('Rename complete!');
});
app.use(express.static("./bundle"));
app.get('/*', (req, res) => {
    const context = {};
    // Create a sheetsRegistry instance.
    const sheetsRegistry = new SheetsRegistry();

    // Create a sheetsManager instance.
    const sheetsManager = new Map();

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
    const app = ReactDOMServer.renderToString(
        <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
            <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
                <StaticRouter location={req.url} context={context}>
                    <Root></Root>
                </StaticRouter>
            </MuiThemeProvider>
        </JssProvider>
    );
    
    const css = sheetsRegistry.toString();
    // res.send(renderFullPage(app, css));
    fs.readFile('./bundle/main.html', 'utf8', (err, data) => {
        if (err) {
          console.error('Something went wrong:', err);
          return res.status(500).send('Oops, better luck next time!');
        }
    
        return res.send(
          data.replace('<div id="app"></div>', `<div id="app">${app}</div><style id="jss-server-side">${css}</style>`)
        );
      });
});

app.listen(PORT, () => {
    console.log(`😎 Server is listening on port ${PORT}`);
});