const {Auth} = require('./auth');
const {Storage} = require('./storage');

const storage = new Storage();

function auth(req, res) {
    console.log('auth:', req.body);
    const {name: username, password} = req.body;
    const id = Auth.auth(req.session, {username, password});
    if (id) {
        const user = USERS.find(u => u.id === id);
        console.log('user:', user);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(401).json({error: 'user not found'});
        }
    } else {
        res.status(401).json({error: 'unknown credentials'});
    }
}

function deauth(req, res) {
    console.log('deauth:', req.body);
    Auth.clear(req.session);
    res.status(200).end();
}

/*
function checkAuth(req, res, next) {
    if(req.session) {
        if (Auth.check(req.session)) {
           next();
        } else {
            res.
        }
    }
    next();
}
*/

function register(req, res) {
    const {body} = req;
    console.log('register:', body);
    let response;
    setTimeout(() => {
        if (body.name === 'a') {
            response = {name: 'testName', id: '01'};
            console.log(response);
            res.status(200).json(response);
        } else if (body.name === 'b') {
            response = {error: 'name already used'};
            console.log(response);
            res.status(200).json(response);
        } else if (body.name === 'c') {
            response = {error: 'email already used'};
            console.log(response);
            res.status(200).json(response);
        } else {
            res.status(500).json({});
        }
    }, 2000);
}

function onlineUsers(req, res) {
    setTimeout(() => {
        // console.log('online');
        res.status(200).json(['user1', 'user2', 'user3', 'user4'])
    }, 500);
}


function forumList(req, res) {
    setTimeout(() => {
        res.status(200).json(storage.getForums());
    }, 1000);
}

function forumThreads(req, res) {
    const id = req.body.id;
    if (id) {
        setTimeout(() => {
            res.status(200).json(storage.getThreads(id));
        }, 1000);
    } else {
        res.status(400).end(`no such forumId ${id}`);
    }
}

function forumPosts(req, res) {
    const id = req.body.id;
    if (id) {
        setTimeout(() => {
            res.status(200).json(storage.getPosts(id));
        }, 500);
    } else {
        res.status(400).end(`no such threadId ${id}`);
    }
}

function addThreadViewCount(req, res) {
    const id = req.body.id;
    if (id) {
        res.status(200).json(storage.addThreadViewCount(id));
    } else {
        res.status(400).end(`no such threadId ${id}`);
    }
}

module.exports = {
    auth,
    deauth,
    /*checkAuth,*/
    register,
    onlineUsers,
    forumList,
    forumThreads,
    forumPosts,
    addThreadViewCount
};