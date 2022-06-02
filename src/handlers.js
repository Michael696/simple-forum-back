const {Auth} = require('./auth');
const {Storage} = require('./storage');

const storage = new Storage();

function auth(req, res) {
    const {name: username, password} = req.body;
    if (username && password) {
        const id = Auth.auth(req.session, {username, password});
        if (id) {
            const user = storage.getUserByName(username);
            if (user) {
                storage.addOnlineUser(user.id); // TODO build onlineUsers after start from active sessions
                res.status(200).json(user);
            } else {
                res.status(401).json({error: 'user not found'});
            }
        } else {
            res.status(401).json({error: 'unknown credentials'});
        }
    } else {
        res.status(400).json({error: 'invalid request'});
    }
}

function currentUser(req, res) {
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

function register(req, res) { // TODO make it real
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
    }, 500);
}

function forumThreads(req, res) {
    const {id} = req.body;
    if (id) {
        setTimeout(() => {
            res.status(200).json(storage.getThreads(id));
        }, 500);
    } else {
        res.status(400).end(`no such forumId ${id}`);
    }
}

/**
 * Copies specified fields from one object to another new object. If at least one field does not exists, returns "false"
 * @param obj source object
 * @param fields fields to pick
 */
function objectPick(obj, fields) { // TODO unit tests
    let picked = {};
    return fields.every(field => {
        if (typeof obj[field] === 'undefined' || obj[field] === null) {
            return false;
        } else {
            picked[field] = obj[field];
            return true;
        }
    }) && picked;
}

function forumPosts(req, res) {
    const params = objectPick(req.body, ['id', 'start', 'end']);
    if (params) {
        setTimeout(() => {
            res.status(200).json(storage.getPosts(params));
        }, 500);
    } else {
        res.status(400).end(`invalid request`);
    }
}

function addThreadViewCount(req, res) {
    const {id} = req.body;
    if (id) {
        res.status(200).json(storage.addThreadViewCount(id));
    } else {
        res.status(400).end(`invalid request`);
    }
}

function createThread(req, res) {
    if (req.session && req.session.username) {
        const thread = objectPick(req.body, ['forumId', 'author', 'title']);
        if (thread) {
            const id = storage.addThread(thread);
            if (id) {
                res.status(200).json({id});
            } else {
                res.status(403).json({error: 'you are banned'});
            }
        } else {
            res.status(400).json({error: 'invalid request'});
        }
    } else {
        res.status(401).json({error: 'unauthorized'});
    }
}

function createPost(req, res) {
    if (req.session && req.session.username) {
        const post = objectPick(req.body, ['author', 'text', 'forumId', 'threadId']);
        console.log('post:', post);
        if (post) {
            const id = storage.addPost(post);
            if (id) {
                res.status(200).json({id});
            } else {
                res.status(403).json({error: 'you are banned'});
            }
        } else {
            res.status(400).json({error: 'invalid request'});
        }
    } else {
        res.status(401).json({error: 'unauthorized'});
    }
}

function setPostText(req, res) {
    if (req.session && req.session.username) {
        const post = objectPick(req.body, ['id', 'text']);
        if (post) {
            const result = storage.setPostText(post);
            if (result) {
                res.status(200).json({});
            } else {
                res.status(403).json({error: 'you are banned'});
            }
        } else {
            res.status(400).json({error: 'invalid request'});
        }
    } else {
        res.status(401).json({error: 'unauthorized'});
    }
}

function removePost(req, res) {
    if (req.session && req.session.username) {
        const id = req.body.id;
        if (id) {
            const result = storage.removePost(id);
            if (result) {
                res.status(200).json({});
            } else {
                res.status(403).json({error: 'you are banned'});
            }
        } else {
            res.status(400).json({error: 'invalid request'});
        }
    } else {
        res.status(401).json({error: 'unauthorized'});
    }
}

function likeDislikeHandler(actionFunction) {
    return function (req, res) {
        if (req.session && req.session.username) {
            const user = storage.getUserByName(req.session.username);
            if (user) {
                const postId = req.body.id;
                if (postId) {
                    const post = storage.getPostById(postId);
                    if (post) {
                        const result = actionFunction(postId, user.id);
                        if (result) {
                            res.status(200).json({});
                        } else {
                            res.status(403).json({error: `post '${postId}' already has like/dislike`});
                        }
                    } else {
                        res.status(400).json({error: `post '${postId}' not found`});
                    }
                } else {
                    res.status(400).json({error: 'invalid request'});
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
        const threadId = req.body.id;
        if (threadId) {
            const thread = storage.getThreadById(threadId);
            if (thread) {
                if (thread.author.name === req.session.username) {
                    if (thread.author.isBanned) {
                        res.status(403).json({error: 'you are banned'});
                    } else {
                        storage.removeThread(threadId);
                        res.status(200).json({});
                    }
                } else {
                    res.status(401).json({error: `you are not the author of the thread '${threadId}'`});
                }
            } else {
                res.status(400).json({error: 'thread not found'});
            }
        } else {
            res.status(400).json({error: 'invalid request'});
        }
    } else {
        res.status(401).json({error: 'unauthorized'});
    }
}

function banUser(req, res) {
    if (req.session && req.session.username) {
        const {id: userId} = req.body;
        if (userId) {
            if (storage.isAdmin(req.session.username)) {
                storage.banUser(userId);
                res.status(200).json({});
            } else {
                res.status(403).json({error: 'you are not an admin'});
            }
        } else {
            res.status(400).json({error: 'invalid request'});
        }
    } else {
        res.status(401).json({error: 'unauthorized'});
    }
}

function unbanUser(req, res) {
    if (req.session && req.session.username && req.body.id) {
        const {id: userId} = req.body;
        if (userId) {
            if (storage.isAdmin(req.session.username)) {
                storage.unbanUser(userId);
                res.status(200).json({});
            } else {
                res.status(403).json({error: 'you are not an admin'});
            }
        } else {
            res.status(401).json({error: 'invalid request'});
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