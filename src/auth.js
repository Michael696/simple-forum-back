class Auth extends Object {
    static auth({session, storage, username, password}) {
        if (session) {
            const user = storage.getUserByName(username);
            if (user) {
                if (user.password === password) {
                    session.authenticated = true;
                    session.username = username;
                    return user;
                }
            }
        }
        return false;
    }

    static check(session) {
        return session && session.username && session.username.length > 0;
    }

    static clear(session) {
        if (session) {
            session.destroy();
            return true;
        }
        return false;
    }
}

module.exports = {Auth};