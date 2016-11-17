'use strict';

import config   from '../../gulp/config';
import express  from 'express';
import fs       from 'fs';
import preact   from 'preact';
import render   from 'preact-render-to-string';
import Comp     from './components/Comp';

console.log(Comp)

// basic HTTP server via express:
const app = express();
const baseUrl = global.isProd ? config.prodDir : config.buildDir;
const bundle = fs.readFileSync(`${baseUrl}js/${config.scripts.outputFile}`, {encoding: 'utf8'});
const template = fs.readFileSync(`${baseUrl}index.html`, {encoding: 'utf8'});

function startServer() {
    
    app.listen(config.browserPort);

    app.get('*', index_html);
    app.get('/:props', index_html);
    app.get('/index.html', index_html);
    app.get('js/bundle.js', function(req, res) {
        res.send(bundle);
    });

    // on each request, render and return a component:
    // app.get('/:type', (req, res) => {
    //     let html = render(<Comp type={req.params.type} />);
    //     // send it back wrapped up as an HTML5 document:
    //     res.send(`<!DOCTYPE html><html><body>${html}</body></html>`);
    // });
}

function index_html(req, res) {
    // let html = render(<Comp {...req.query} />);
    let html = 'test';
    // send it back wrapped up as an HTML5 document:
    res.send(`<!DOCTYPE html><html><body>${html}</body></html>`);
}

startServer();