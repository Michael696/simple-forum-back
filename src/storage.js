function getUserTemplate() {
    return {
        id: '',
        name: '',
        realName: '',
        registeredAt: '',
        eMail: '',
        posts: 0,
        location: '',
        isBanned: false,
        isAdmin: false
    }
}

function getThreadTemplate() {
    return {
        id: '',
        forumId: '',
        author: {},
        title: '',
        postCount: 0,
        viewCount: 0,
        likes: [],
        dislikes: [],
        lastMessage: {
            dateTime: '', user: {}
        }
    }
}

function getPostTemplate() {
    return {
        id: '',
        threadId: '',
        forumId: '',
        author: {},
        title: '',
        text: '',
        likes: [],
        dislikes: [],
        postedAt: '',
        editedAt: '',
    }
}

class Storage {

    constructor() {
        this.onlineUsers = [];
        this.users = [
            {
                id: '01',
                name: 'a',
                realName: ' user1 real name',
                registeredAt: '2000-01-01',
                eMail: 'mailA@mail.su',
                posts: 9999,
                location: 'chair',
                isBanned: false,
                isAdmin: true
            }, {
                id: '02',
                name: 'user2',
                realName: ' user2 real name',
                registeredAt: '2001-01-01',
                eMail: 'mailB@mail.su',
                posts: 888,
                location: 'home',
                isBanned: false,
                isAdmin: false,
            }, {
                id: '03',
                name: 'user3',
                realName: ' user3 real name',
                registeredAt: '2002-01-01',
                eMail: 'mailC@mail.su',
                posts: 777,
                location: 'bath',
                isBanned: false,
                isAdmin: false,
            }, {
                id: '04',
                name: 'user4',
                realName: ' user4 real name',
                registeredAt: '2003-01-01',
                eMail: 'mailD@mail.su',
                posts: 666,
                location: 'kitchen',
                isBanned: true,
                isAdmin: false,
            }
        ];
        this.nextUserId = 5;
        this.forums = [
            {
                id: 'f01',
                name: 'forum1',
                description: 'forum1 long description',
                themeCount: 10,
                postCount: 100,
                lastMessage: {
                    dateTime: '2022-01-01T12:13:14', user: this.users[0]
                }
            }, {
                id: 'f02',
                name: 'forum2',
                description: 'forum2 long description',
                themeCount: 20,
                postCount: 200,
                lastMessage: {
                    dateTime: '2022-02-02T14:16:18', user: this.users[1]
                }
            }, {
                id: 'f03',
                name: 'forum3',
                description: 'forum3 long description',
                themeCount: 30,
                postCount: 300,
                lastMessage: {
                    dateTime: '2022-03-03T15:17:19', user: this.users[2]
                },
            }, {
                id: 'f04',
                name: 'forum4',
                description: 'forum4 long description',
                themeCount: 40,
                postCount: 400,
                lastMessage: {
                    dateTime: '2022-03-03T16:18:20', user: this.users[3]
                },
            }

        ];
        this.nextForumId = 5;
        this.threads = [
            {
                id: 't01',
                forumId: 'f01',
                author: this.users[0],
                title: 'forum id1 thread title 1',
                postCount: 10,
                viewCount: 123,
                likes: [this.users[2], this.users[3]],
                dislikes: [this.users[0]],
                lastMessage: {
                    dateTime: '2022-03-03T16:18:20', user: this.users[3]
                },
            },
            {
                id: 't02',
                forumId: 'f01',
                author: this.users[1],
                title: 'forum id1 thread title 2',
                postCount: 15,
                viewCount: 234,
                likes: [this.users[1], this.users[2]],
                dislikes: [this.users[3]],
                lastMessage: {
                    dateTime: '2022-03-03T17:19:13', user: this.users[2]
                },
            },
            {
                id: 't03',
                forumId: 'f01',
                author: this.users[1],
                title: 'forum id1 thread title 3',
                postCount: 123,
                viewCount: 3456,
                likes: [this.users[0], this.users[1]],
                dislikes: [this.users[2]],
                lastMessage: {
                    dateTime: '2022-04-05T13:19:13', user: this.users[1]
                },
            },
            {
                id: 't04',
                forumId: 'f02',
                author: this.users[3],
                title: 'forum id2 thread title 1',
                postCount: 10,
                viewCount: 123,
                likes: [this.users[3], this.users[0]],
                dislikes: [this.users[1]],
                lastMessage: {
                    dateTime: '2022-03-03T16:18:20', user: this.users[3]
                },
            },
            {
                id: 't05',
                forumId: 'f02',
                author: this.users[2],
                title: 'forum id2 thread title 2',
                postCount: 15,
                viewCount: 234,
                likes: [this.users[0], this.users[1]],
                dislikes: [this.users[2]],
                lastMessage: {
                    dateTime: '2022-03-03T17:19:13', user: this.users[2]
                },
            },
            {
                id: 't06',
                forumId: 'f02',
                author: this.users[2],
                title: 'forum id2 thread title 3',
                postCount: 123,
                viewCount: 3456,
                likes: [this.users[2], this.users[1]],
                dislikes: [this.users[0]],
                lastMessage: {
                    dateTime: '2022-04-05T13:19:13', user: this.users[1]
                },
            }
        ];
        this.nextThreadId = 7;
        this.posts = [
            {
                id: 'p01',
                threadId: 't01',
                forumId: 'f01',
                author: this.users[2],
                title: 'post 1 title',
                text: 'post 1 long text',
                likes: [this.users[1]],
                dislikes: [],
                postedAt: '2022-04-05T13:19:13',
                editedAt: '2022-04-05T13:19:15',
            },
            {
                id: 'p02',
                threadId: 't01',
                forumId: 'f01',
                author: this.users[1],
                title: 'post 2 title',
                text: 'post 2 long text',
                likes: [],
                dislikes: [],
                postedAt: '2022-04-05T14:19:13',
                editedAt: '2022-04-05T15:19:15',
            },
            {
                id: 'p03',
                threadId: 't01',
                forumId: 'f01',
                author: this.users[2],
                title: 'post 3 title',
                text: 'post 3 long text',
                likes: [],
                dislikes: [this.users[0]],
                postedAt: '2022-04-05T16:18:19',
                editedAt: '2022-04-05T17:20:21',
            },
            {
                id: 'p04',
                threadId: 't02',
                forumId: 'f01',
                author: this.users[1],
                title: 'post 3 title',
                text: 'post 3 long text post 3 long text post 3 long text post 3 long text post 3 long text post 3 long text post 3 long text post 3 long text post 3 long text post 3 long text post 3 long text post 3 long text post 3 long text post 3 long text post 3 long text post 3 long text ',
                likes: [],
                dislikes: [],
                postedAt: '2022-04-05T13:19:13',
                editedAt: '2022-04-05T13:19:15',
            },
            {
                id: 'p05',
                threadId: 't02',
                forumId: 'f01',
                author: this.users[3],
                title: 'post 2 title',
                text: 'post 2 long text',
                likes: [],
                dislikes: [],
                postedAt: '2022-04-05T14:19:13',
                editedAt: '2022-04-05T15:19:15',
            }
        ];
        this.nextPostId = 5;
    }

    registerUser(username, password, eMail) {

    }

    getUserByName(name) {
        return this.users.find(user => user.name === name);
    }

    getThreads(forumId) {
        return this.threads.filter(thread => thread.forumId === forumId);
    }

    getForums() {
        return this.forums;
    }

    getPosts(threadId) {
        return this.posts.filter(post => post.threadId === threadId);
    }

    getOnlineUsers() {
        return this.onlineUsers;
    }

    addOnlineUser(id) {
        if (!this.onlineUsers.some(user => user.id === id)) {
            const user = this.users.find(user => user.id === id);
            if (user) {
                this.onlineUsers.push(user);
            }
        }
    }

    removeOnlineUser(id) {
        this.onlineUsers = this.onlineUsers.filter(user => user.id !== id);
    }

    addPost(post) {
        const author = this.users.find(user => user.id === post.author);
        if (!author.isBanned) {
            const postTemplate = getPostTemplate();
            const postedAt = new Date().toISOString();
            this.nextPostId++;
            const postData = {
                ...postTemplate,
                ...post,
                author,
                id: this.nextPostId.toString(),
                postedAt
            };
            console.log('creating post:', postData);
            this.posts.push(postData);
            const thread = this.threads.find(thread => thread.id === post.threadId);
            if (thread) {
                thread.postCount++;
                thread.lastMessage = {
                    dateTime: postedAt,
                    user: author
                }
            }
            return this.nextPostId;
        }
        return false;
    }

    setPostText({id, text}) {
        const post = this.posts.find(post => post.id === id);
        if (post) {
            post.text = text;
            return true;
        }
        return false;
    }

    addThread(thread) {
        const threadTemplate = getThreadTemplate();
        const author = this.users.find(user => user.id === thread.author);
        if (!author.isBanned) {
            this.nextThreadId++;
            const threadData = {
                ...threadTemplate,
                ...thread,
                author,
                id: this.nextThreadId.toString()
            };
            this.threads.push(threadData);
            return this.nextThreadId;
        }
        return false;
    }

    addThreadViewCount(threadId) {
        const thread = this.threads.find(thread => thread.id === threadId);
        if (thread) {
            thread.viewCount++;
            return true;
        }
        return false;
    }

    addPostViewCount(postId) {
        const post = this.posts.find(post => post.id === postId);
        if (post) {
            post.viewCount++;
            return true;
        }
        return false;
    }

    banUser(userId) {
        const user = this.users.find(user => user.id === userId);
        if (user) {
            user.isBanned = true;
            return true;
        }
        return false;
    }

    unbanUser(userId) {
        const user = this.users.find(user => user.id === userId);
        if (user) {
            user.isBanned = false;
            return true;
        }
        return false;
    }

}


module.exports = {Storage};