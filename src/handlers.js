const {Auth} = require('./auth');

function auth(req, res) {
    console.log('auth:', req.body);
    const {name: username, password} = req.body;
    const id = Auth.auth(req.session, {username, password});
    if (id) {
        res.status(200).json({name: username, id});
    } else {
        res.status(401).json({error: true});
    }
}

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

const USERS = [
    {
        id: '01',
        name: 'user1',
        registeredAt: '2000-01-01',
        posts: 9999,
        location: 'chair',
        isBanned: false,
        isAdmin: true
    }, {
        id: '02', name: 'user2', registeredAt: '2001-01-01', posts: 888, location: 'home', isBanned: false
    }, {
        id: '03', name: 'user3', registeredAt: '2002-01-01', posts: 777, location: 'bath', isBanned: false
    }, {
        id: '04', name: 'user4', registeredAt: '2003-01-01', posts: 666, location: 'kitchen', isBanned: true
    }
];

function forumList(req, res) {
    setTimeout(() => {
        res.status(200).json([
            {
                id: 'f01',
                name: 'forum1',
                description: 'forum1 long description',
                themeCount: 10,
                postCount: 100,
                lastMessage: {
                    dateTime: '2022-01-01T12:13:14', user: USERS[0]
                }
            }, {
                id: 'f02',
                name: 'forum2',
                description: 'forum2 long description',
                themeCount: 20,
                postCount: 200,
                lastMessage: {
                    dateTime: '2022-02-02T14:16:18', user: USERS[1]
                }
            }, {
                id: 'f03',
                name: 'forum3',
                description: 'forum3 long description',
                themeCount: 30,
                postCount: 300,
                lastMessage: {
                    dateTime: '2022-03-03T15:17:19', user: USERS[2]
                },
            }, {
                id: 'f04',
                name: 'forum4',
                description: 'forum4 long description',
                themeCount: 40,
                postCount: 400,
                lastMessage: {
                    dateTime: '2022-03-03T16:18:20', user: USERS[3]
                },
            }

        ]);
    }, 1000);
}

function forumThreads(req, res) {
    const id = req.body.id;
    if (id) {
        setTimeout(() => {
            // console.log('online');
            const threads = {
                'f01': [
                    {
                        id: 't01',
                        author: {id: '01', name: 'user1'},
                        title: 'forum id1 thread title 1',
                        postCount: 10,
                        viewCount: 123,
                        likes: 234,
                        dislikes: 12,
                        isLikes: false,
                        lastMessage: {
                            dateTime: '2022-03-03T16:18:20', user: USERS[3]
                        },
                    },
                    {
                        id: 't02',
                        author: {id: '02', name: 'user2'},
                        title: 'forum id1 thread title 2',
                        postCount: 15,
                        viewCount: 234,
                        likes: 345,
                        dislikes: 23,
                        isLikes: false,
                        lastMessage: {
                            dateTime: '2022-03-03T17:19:13', user: USERS[2]
                        },
                    },
                    {
                        id: 't03',
                        author: {id: '02', name: 'user2'},
                        title: 'forum id1 thread title 3',
                        postCount: 123,
                        viewCount: 3456,
                        likes: 456,
                        dislikes: 34,
                        isLikes: false,
                        lastMessage: {
                            dateTime: '2022-04-05T13:19:13', user: USERS[1]
                        },
                    }
                ],
                'f02': [
                    {
                        id: 't04',
                        author: {id: '01', name: 'user1'},
                        title: 'forum id2 thread title 1',
                        postCount: 10,
                        viewCount: 123,
                        likes: 1234,
                        dislikes: 112,
                        isLikes: false,
                        lastMessage: {
                            dateTime: '2022-03-03T16:18:20', user: USERS[3]
                        },
                    },
                    {
                        id: 't05',
                        author: {id: '02', name: 'user2'},
                        title: 'forum id2 thread title 2',
                        postCount: 15,
                        viewCount: 234,
                        likes: 2234,
                        dislikes: 212,
                        isLikes: false,
                        lastMessage: {
                            dateTime: '2022-03-03T17:19:13', user: USERS[2]
                        },
                    },
                    {
                        id: 't06',
                        author: {id: '02', name: 'user2'},
                        title: 'forum id2 thread title 3',
                        postCount: 123,
                        viewCount: 3456,
                        likes: 3234,
                        dislikes: 312,
                        isLikes: false,
                        lastMessage: {
                            dateTime: '2022-04-05T13:19:13', user: USERS[1]
                        },
                    }
                ]
            };

            res.status(200).json(threads[id])
        }, 1000);
    } else {
        res.status(400).end(`no such forumId ${id}`);
    }
}

function forumPosts(req, res) {
    const id = req.body.id;
    if (id) {
        setTimeout(() => {
            const posts = {
                't01': [
                    {
                        id: 'p01',
                        author: USERS[2],
                        title: 'post 1 title',
                        text: 'post 1 long text',
                        likes: 1,
                        dislikes: 2,
                        isLiked: false,
                        postedAt: '2022-04-05T13:19:13',
                        editedAt: '2022-04-05T13:19:15',
                    },
                    {
                        id: 'p02',
                        author: USERS[1],
                        title: 'post 2 title',
                        text: 'post 2 long text',
                        likes: 3,
                        dislikes: 4,
                        isLiked: false,
                        postedAt: '2022-04-05T14:19:13',
                        editedAt: '2022-04-05T15:19:15',
                    }
                ],
                't02': [
                    {
                        id: 'p03',
                        author: USERS[0],
                        title: 'post 3 title',
                        text: 'post 3 long text post 3 long text post 3 long text post 3 long text post 3 long text post 3 long text post 3 long text post 3 long text post 3 long text post 3 long text post 3 long text post 3 long text post 3 long text post 3 long text post 3 long text post 3 long text ',
                        likes: 31,
                        dislikes: 32,
                        isLiked: false,
                        postedAt: '2022-04-05T13:19:13',
                        editedAt: '2022-04-05T13:19:15',
                    },
                    {
                        id: 'p04',
                        author: USERS[3],
                        title: 'post 2 title',
                        text: 'post 2 long text',
                        likes: 3,
                        dislikes: 4,
                        isLiked: false,
                        postedAt: '2022-04-05T14:19:13',
                        editedAt: '2022-04-05T15:19:15',
                    }
                ]

            };
            res.status(200).json(posts[id])
        }, 500);
    } else {
        res.status(400).end(`no such threadId ${id}`);
    }
}


module.exports = {auth, register, onlineUsers, forumList, forumThreads, forumPosts};