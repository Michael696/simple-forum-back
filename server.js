'use strict';
const express = require('express');
const loggerHttp = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
// const FileStore = require('session-file-store')(session);
const MemoryStore = require('memorystore')(session);
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


app.use(bodyParser.json());

app.use(session({
    secret: 'secret',
    name: 'session',
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 86400000,
        sameSite: 'None',
    },
    store: new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
    }),
    rolling: true,
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
}));

app.use(cors({
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
    methods: ['OPTIONS', 'POST'],
    allowedHeaders: [
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Credentials',
        'Access-Control-Request-Method',
        'Access-Control-Request-Headers',
        'Origin',
        'Content-Type',
        // 'Accept',
        // 'X-Requested-With',
        // 'Authorization',
    ],
    credentials: true
}));

/*
app.use((req, res, next) => {
    // console.log('middle', Object.keys(req));
    if (req.session) {
        console.log('session:', req.session);
    }
    next();
});
*/

app.post('/api/auth', handlers.auth);
app.post('/api/current-user', handlers.currentUser);
app.post('/api/deauth', handlers.deauth);
app.post('/api/register', handlers.register);
app.post('/api/online-users', handlers.onlineUsers);
app.post('/api/forum-list', handlers.forumList);
app.post('/api/threads', handlers.forumThreads);
app.post('/api/posts', handlers.forumPosts);
app.post('/api/get-post-count', handlers.getPostCount);
app.post('/api/add-threadViewCount', handlers.addThreadViewCount);
app.post('/api/create-thread', [handlers.checkAuth, handlers.createThread]);
app.post('/api/create-post', [handlers.checkAuth, handlers.createPost]);
app.post('/api/set-post-text', [handlers.checkAuth, handlers.setPostText]);
app.post('/api/remove-post', [handlers.checkAuth, handlers.removePost]);
app.post('/api/add-post-like', [handlers.checkAuth, handlers.addPostLike]);
app.post('/api/add-post-dislike', [handlers.checkAuth, handlers.addPostDislike]);
app.post('/api/remove-thread', [handlers.checkAuth, handlers.removeThread]);
app.post('/api/ban-user', [handlers.checkAuth, handlers.banUser]);
app.post('/api/unban-user', [handlers.checkAuth, handlers.unbanUser]);
app.post('/api/get-banned', [handlers.checkAuth, handlers.getBanned]);

let server = app.listen(1337, function () {
    let msg = `Express server is listening on ${JSON.stringify(server.address())}`;
    console.log(msg);
});
