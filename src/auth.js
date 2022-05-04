class Auth extends Object {
    static auth(session, {username, password}) {
        if (session) {
            if (password === 'a') {
                session.authenticated = true;
                session.username = username;
                return '01'; // id
            }
            if (password === 'b') {
                session.authenticated = true;
                session.username = username;
                return '02'; // id
            }
            if (password === 'd') {
                session.authenticated = true;
                session.username = username;
                return '04'; // id
            }
        }
        return false;
    }

    static check(session) {
        return session && session.username.length > 0;
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