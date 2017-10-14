'use strict'
require('babel-register');
import express from 'express';
import bodyParser from 'body-parser';
// import morgan from 'morgan';
import {resolve} from 'path';

const app = express()
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())

    // .use(morgan)

    .use(express.static(resolve(__dirname, '../public')))

    .get('/heartbeat', (_, res) => res.send({ok: true}))
    .get('/*', (_, res) => res.sendFile(resolve(__dirname, '../public/index.html')))

    .use((err, req, res, next) => {
        console.error(err, typeof next);
        console.error(err.stack);
        res.status(err.status || 500).send(err.message || 'Internal server error.');
    });

const server = app.listen(1337, () => {
    console.log(`--- Yesh Mashter? ---`);
    console.log(`Listening on port 1337`);
});

export default app;