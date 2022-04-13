'use strict';
const express = require('express');
const loggerHttp = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const app = express();
const handlers = require('./src/handlers');

loggerHttp.token('req-body-short', function (req) {
    if (req.body) {
        return JSON.stringify(req.body).slice(0, 80) + '...';
    } else {
        return 'empty body';
    }
});

loggerHttp.token('req-body', function (req) {
    return JSON.stringify(req.body);
});

app.use(loggerHttp(':remote-addr :method :url :status :response-time ms len=:req[content-length] body=:req-body-short')); // :date[iso]

/*
app.use(loggerHttp(':remote-addr :method :url :status :response-time ms len=:req[content-length] body=:req-body',
    {
        stream: {
            write: function (str) {
                logger.info(str.trim());
            }
        }
    }
));
*/

app.use(cors({
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
    methods: ['OPTIONS', 'POST'],
    allowedHeaders: ['Access-Control-Allow-Headers', 'Access-Control-Allow-Origin', 'Origin', 'Accept', 'X-Requested-With', 'Content-Type',
        'Access-Control-Request-Method', 'Access-Control-Request-Headers', 'Authorization'],
    credentials: true
}));

app.use(bodyParser.json());

app.post('/api/auth', handlers.auth);
app.post('/api/register', handlers.register);
app.post('/api/online-users', handlers.onlineUsers);


let server = app.listen(1337, function () {
    let msg = `Express server is listening on ${JSON.stringify(server.address())}`;
    console.log(msg);
});
