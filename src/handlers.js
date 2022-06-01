const {Auth} = require('./auth');
const {Storage} = require('./storage');

const storage = new Storage();

function auth(req, res) {
    const {name: username, password} = req.body;
    const id = Auth.auth(req.session, {username, password});
    if (id) {
        const user = storage.getUserByName(username);
        if (user) {
            storage.addOnlineUser(user.id);
            res.status(200).json(user);
        } else {
            res.status(401).json({error: 'user not found'});
        }
    } else {
        res.status(401).json({error: 'unknown credentials'});
    }
}

function currentUser(req, res) {
    console.log('currentUser:', req.body);
    if (req.session && req.session.username) {
        const user = storage.getUserByName(req.session.username);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(401).json({error: 'user not found'});
        }
    } else {
        res.status(401).json({error: 'invalid session'});
    }
}

function deauth(req, res) {
    console.log('deauth:', req.body);
    const user = storage.getUserByName(req.session.username);
    if (user) {
        storage.removeOnlineUser(user.id);
    }
    Auth.clear(req.session);
    res.status(200).end();
}

function checkAuth(req, res, next) {
    if (Auth.check(req.session)) {
        next();
    } else {
        res.status(401).end();
    }
}

function register(req, res) {
    const {body} = req;
    console.log('register:', body);
    let response;
    setTimeout(() => {
        if (body.name === 'a') {
            response = {name: 'testName', id: '01'};
            console.log('register resp:', response);
            res.status(200).json(response);
        } else if (body.name === 'b') {
            response = {error: 'name already used'};
            console.log('register resp:', response);
            res.status(200).json(response);
        } else if (body.name === 'c') {
            response = {error: 'email already used'};
            console.log('register resp:', response);
            res.status(200).json(response);
        } else {
            res.status(500).json({});
        }
    }, 2000);
}

function onlineUsers(req, res) {
    setTimeout(() => {
        const online = storage.getOnlineUsers().map(user => user.name);
        // console.log('online');
        res.status(200).json(online)
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
        }, 1500);
    } else {
        res.status(400).end(`no such forumId ${id}`);
    }
}

function forumPosts(req, res) {
    const {id, start, end} = req.body;
    if (id) {
        setTimeout(() => {
            res.status(200).json(storage.getPosts({id, start, end}));
        }, 1500);
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

function createThread(req, res) {
    if (req.session && req.session.username) {
        const id = storage.addThread(req.body);
        if (id) {
            res.status(200).json({id});
        } else {
            res.status(403).json({error: 'you are banned'});
        }
    } else {
        res.status(401).json({error: 'unauthorized'});
    }
}

function createPost(req, res) {
    if (req.session && req.session.username) {
        const id = storage.addPost(req.body);
        if (id) {
            res.status(200).json({id});
        } else {
            res.status(403).json({error: 'you are banned'});
        }
    } else {
        res.status(401).json({error: 'unauthorized'});
    }
}

function setPostText(req, res) {
    if (req.session && req.session.username) {
        const result = storage.setPostText(req.body);
        if (result) {
            res.status(200).json({});
        } else {
            res.status(403).json({error: 'you are banned'});
        }
    } else {
        res.status(401).json({error: 'unauthorized'});
    }
}

function removePost(req, res) {
    if (req.session && req.session.username) {
        const result = storage.removePost(req.body);
        if (result) {
            res.status(200).json({});
        } else {
            res.status(403).json({error: 'you are banned'});
        }
    } else {
        res.status(401).json({error: 'unauthorized'});
    }
}

function likeDislikeHandler(actionFunction) {
    return function (req, res) {
        if (req.session && req.session.username) {
            const postId = req.body.id;
            const user = storage.getUserByName(req.session.username);
            if (user) {
                const post = storage.getPostById(postId);
                if (post) {
                    const result = actionFunction(postId, user.id);
                    if (result) {
                        res.status(200).json({});
                    } else {
                        res.status(403).json({error: 'already has like/dislike'});
                    }
                } else {
                    res.status(400).json({error: 'post not found'});
                }
            } else { // is it possible ?
                res.status(401).json({error: 'unauthorized'});
            }
        } else {
            res.status(401).json({error: 'unauthorized'});
        }
    }
}

function addPostLike(req, res) {
    const handler = likeDislikeHandler(storage.addLike.bind(storage));
    handler(req, res);
}

function addPostDislike(req, res) {
    const handler = likeDislikeHandler(storage.addDislike.bind(storage));
    handler(req, res);
}

function getPostCount(req, res) {
    const {id} = req.body;
    const count = storage.getPostCount({id});
    console.log(`getPostCount count for id=${id}`, count);
    res.status(200).json(count);
}

function removeThread(req, res) {
    if (req.session && req.session.username) {
        const thread = storage.getThreadById(req.body.id);
        if (thread) {
            if (thread.author.name === req.session.username) {
                if (thread.author.isBanned) {
                    res.status(403).json({error: 'you are banned'});
                } else {
                    storage.removeThread(req.body.id);
                    res.status(200).json({});
                }
            } else {
                res.status(401).json({error: 'unauthorized'});
            }
        } else {
            res.status(400).json({error: 'thread not found'});
        }
    } else {
        res.status(401).json({error: 'unauthorized'});
    }
}

function banUser(req, res) {
    if (req.session && req.session.username && req.body.id) {
        if (storage.isAdmin(req.session.username)) {
            storage.banUser(req.body.id);
            res.status(200).json({});
        } else {
            res.status(403).json({error: 'you are not an admin'});
        }
    } else {
        res.status(401).json({error: 'unauthorized'});
    }
}

function unbanUser(req, res) {
    if (req.session && req.session.username && req.body.id) {
        if (storage.isAdmin(req.session.username)) {
            storage.unbanUser(req.body.id);
            res.status(200).json({});
        } else {
            res.status(403).json({error: 'you are not an admin'});
        }
    } else {
        res.status(401).json({error: 'unauthorized'});
    }
}

function getBanned(req, res) {
    if (req.session && req.session.username) {
        if (storage.isAdmin(req.session.username)) {
            const result = storage.getBanned();
            res.status(200).json(result);
        } else {
            res.status(403).json({error: 'you are not an admin'});
        }
    } else {
        res.status(401).json({error: 'unauthorized'});
    }
}

module.exports = {
    auth,
    currentUser,
    deauth,
    checkAuth,
    register,
    onlineUsers,
    forumList,
    forumThreads,
    forumPosts,
    addThreadViewCount,
    createThread,
    createPost,
    banUser,
    unbanUser,
    getBanned,
    setPostText,
    removePost,
    removeThread,
    getPostCount,
    addPostLike,
    addPostDislike
};