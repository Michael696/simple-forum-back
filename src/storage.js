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
        text: '',
        likes: [],
        dislikes: [],
        postedAt: '',
        editedAt: '',
    }
}

// TODO recalculate various quantities(posts, views, etc) on add/remove operations
// TODO add authorization checks for add/remove/modify operations

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
                location: 'moscow',
                isBanned: false,
                isAdmin: true
            }, {
                id: '02',
                name: 'user2',
                realName: ' user2 real name',
                registeredAt: '2001-01-01',
                eMail: 'mailB@mail.su',
                posts: 888,
                location: 'peter',
                isBanned: false,
                isAdmin: false,
            }, {
                id: '03',
                name: 'user3',
                realName: ' user3 real name',
                registeredAt: '2002-01-01',
                eMail: 'mailC@mail.su',
                posts: 777,
                location: 'burg',
                isBanned: false,
                isAdmin: false,
            }, {
                id: '04',
                name: 'user4',
                realName: ' user4 real name',
                registeredAt: '2003-01-01',
                eMail: 'mailD@mail.su',
                posts: 666,
                location: 'sibirsk',
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
                text: 'post 3 long text',
                likes: [],
                dislikes: [this.users[0]],
                postedAt: '2022-04-05T16:18:19',
                editedAt: '2022-04-05T17:20:21',
            },
            {
                id: 'p03a',
                threadId: 't01',
                forumId: 'f01',
                author: this.users[3],
                text: 'post 4 long text',
                likes: [],
                dislikes: [this.users[1]],
                postedAt: '2022-04-05T17:18:19',
                editedAt: '2022-04-05T18:20:21',
            },
            {
                id: 'p03b',
                threadId: 't01',
                forumId: 'f01',
                author: this.users[3],
                text: 'post 5 long text',
                likes: [],
                dislikes: [this.users[1]],
                postedAt: '2022-04-05T17:18:19',
                editedAt: '2022-04-05T18:20:21',
            },
            {
                id: 'p03c',
                threadId: 't01',
                forumId: 'f01',
                author: this.users[3],
                text: 'post 6 long text',
                likes: [],
                dislikes: [this.users[1]],
                postedAt: '2022-04-05T17:18:19',
                editedAt: '2022-04-05T18:20:21',
            },
            {
                id: 'p03d',
                threadId: 't01',
                forumId: 'f01',
                author: this.users[3],
                text: 'post 7 long text',
                likes: [],
                dislikes: [this.users[1]],
                postedAt: '2022-04-05T17:18:19',
                editedAt: '2022-04-05T18:20:21',
            },
            {
                id: 'p03e',
                threadId: 't01',
                forumId: 'f01',
                author: this.users[3],
                text: 'post 8 long text',
                likes: [],
                dislikes: [this.users[1]],
                postedAt: '2022-04-05T17:18:19',
                editedAt: '2022-04-05T18:20:21',
            },
            {
                id: 'p04',
                threadId: 't02',
                forumId: 'f01',
                author: this.users[1],
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

    getThreadById(threadId) {
        return this.threads.find(thread => thread.id === threadId);
    }

    getForums() {
        return this.forums;
    }

    getPosts({id, start, end}) { // threadId
        const filtered = this.posts.filter(post => post.threadId === id);
        const startInt = parseInt(start, 10);
        const endInt = parseInt(end, 10);

        // TODO test for edge cases
        if (startInt > filtered.length && endInt > filtered.length) {
            return {
                posts: [],
                start: -1,
                end: -1
            };
        }

        if (!Number.isNaN(startInt) && !Number.isNaN(endInt)) {
            console.log(`get post start=${startInt} end=${endInt}`);
            const lim = (value, min, max) => value < min ? min : (value > max ? max : value);
            const startOk = lim(startInt, 0, filtered.length - 1);
            const endOk = lim(endInt, 0, filtered.length - 1);
            return {
                posts: filtered.filter((post, idx) => idx >= startOk && idx <= endOk),
                start: startOk,
                end: endOk
            };
        }
        return filtered;
    }

    getPostById(postId) {
        return this.posts.find(post => post.id === postId);
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
            const postId = this.nextPostId++;
            const postData = {
                ...postTemplate,
                ...post,
                author,
                id: postId.toString(),
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
            return postId;
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

    removePost({id}) { // TODO set the "removed" flag, do not actually remove
        this.posts = this.posts.filter(post => post.id !== id);
        return true;
    }

    getPostCount({id}) { // threadId
        if (id) {
            return this.posts.filter(post => post.threadId === id).length;
        } else {
            return 0;
        }
    }

    addThread(thread) {
        const threadTemplate = getThreadTemplate();
        const author = this.users.find(user => user.id === thread.author);
        if (!author.isBanned) {
            const threadId = this.nextThreadId++;
            const threadData = {
                ...threadTemplate,
                ...thread,
                author,
                id: threadId.toString()
            };
            this.threads.push(threadData);
            return threadId;
        }
        return false;
    }

    removeThread(id) {
        this.threads = this.threads.filter(thread => thread.id !== id);
        return true;
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

    addLike(postId, userId) { // TODO refactor duplicate code (addLike/addDislike)
        const post = this.posts.find(post => post.id === postId);
        if (post) {
            const noLikesFromUser = !post.likes.some(like => like.id === userId);
            if (noLikesFromUser) {
                const user = this.users.find(user => user.id === userId);
                if (user) {
                    post.dislikes = post.dislikes.filter(like => like.id !== userId); // remove dislike
                    post.likes.push(user);
                    return true;
                }
            }
        }
        return false;
    }

    addDislike(postId, userId) { // TODO refactor duplicate code (addLike/addDislike)
        const post = this.posts.find(post => post.id === postId);
        if (post) {
            const noDislikesFromUser = !post.dislikes.some(like => like.id === userId);
            if (noDislikesFromUser) {
                const user = this.users.find(user => user.id === userId);
                if (user) {
                    post.likes = post.likes.filter(like => like.id !== userId); // remove like
                    post.dislikes.push(user);
                    return true;
                }
            }
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

    isAdmin(userName) {
        return ~this.users.findIndex(user => user.name === userName && user.isAdmin);
    }

    getBanned() {  // TODO think about authorization
        return this.users.filter(user => user.isBanned).map(user => user.id);
    }
}

module.exports = {Storage};