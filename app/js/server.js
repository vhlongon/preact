'use strict';

// import config   from '../../gulp/config';
import express  from 'express';
import fs       from 'fs';
import preact   from 'preact';
import render   from 'preact-render-to-string';
import Comp     from './components/Comp';


//const dir = global.isProd ? config.prodDir : config.buildDir;
const placeholder = 'The app is loading';
const bundle = fs.readFileSync('build/js/bundle.js', {encoding: 'utf8'});
const template = fs.readFileSync(`build/index.html`, {encoding: 'utf8'});

// basic HTTP server via express:
const app = express();

function index_html(req, res) {
    let html = render(<Comp />);

    // let html = 'test';
    // send it back wrapped up as an HTML5 document:
    res.send(template.replace(placeholder, html));
}

function startServer() {
    app.get('*', index_html);
    app.get('/index.html', index_html);
    app.get('/js/bundle.js', function(req, res) {
        res.send(bundle);
    });

}

app.listen(3000);

startServer();