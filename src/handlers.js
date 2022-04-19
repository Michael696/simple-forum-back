function auth(req, res) {
    console.log('auth:', req.body);
    if (req.body.username === 'test') {
        res.status(200).json({name: 'testName', id: '01'});
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
    }, 1500);
}

function forumList(req, res) {
    setTimeout(() => {
        res.status(200).json([
            {
                id: 'id1',
                name: 'forum1',
                description: 'forum1 long description',
                themeCount: 10,
                postCount: 100,
                lastMessage: {
                    dateTime: '2022-01-01T12:13:14', user: {id: '01', name: 'user1'}
                }
            }, {
                id: 'id2',
                name: 'forum2',
                description: 'forum2 long description',
                themeCount: 20,
                postCount: 200,
                lastMessage: {
                    dateTime: '2022-02-02T14:16:18', user: {id: '02', name: 'user2'}
                }
            }, {
                id: 'id3',
                name: 'forum3',
                description: 'forum3 long description',
                themeCount: 30,
                postCount: 300,
                lastMessage: {
                    dateTime: '2022-03-03T15:17:19', user: {id: '03', name: 'user3'}
                },
            }, {
                id: 'id4',
                name: 'forum4',
                description: 'forum4 long description',
                themeCount: 40,
                postCount: 400,
                lastMessage: {
                    dateTime: '2022-03-03T16:18:20', user: {id: '04', name: 'user4'}
                },
            }

        ]);
    }, 1000);
}

function forumThreads(req,res) {
    const id= req.body.id;
    if (id) {
        setTimeout(() => {
            // console.log('online');
            res.status(200).json([
                {
                    id:'01',
                    author:{id:'01',name:'user1'},
                    title:'thread title 1',
                    postCount: 10,
                    viewCount: 123,
                    lastMessage: {
                        dateTime: '2022-03-03T16:18:20', user: {id: '04', name: 'user4'}
                    },
                },
                {
                    id:'02',
                    author:{id:'02',name:'user2'},
                    title:'thread title 2',
                    postCount: 15,
                    viewCount: 234,
                    lastMessage: {
                        dateTime: '2022-03-03T17:19:13', user: {id: '03', name: 'user3'}
                    },
                },
                {
                    id:'03',
                    author:{id:'02',name:'user2'},
                    title:'thread title 3',
                    postCount: 123,
                    viewCount: 3456,
                    lastMessage: {
                        dateTime: '2022-04-05T13:19:13', user: {id: '02', name: 'user2'}
                    },
                }
            ])
        }, 1000);
    } else {
        res.status(400).end(`no such forumId ${id}`);
    }
}


module.exports = {auth, register, onlineUsers, forumList, forumThreads};