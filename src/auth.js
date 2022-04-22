class Auth extends Object {
    static auth(session, {username, password}) {
        if (session) {
            if (password === 'a') {
                session.authenticated = true;
                session.username = username;
                return '01'; // id
            }
        }
        return false;
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