function auth(req, res) {
    console.log('auth:', req.body);
    if (req.body.username === 'test') {
        res.status(200).json({name: 'testName', id: '01'});
    } else {
        res.status(401).json({error: true});
    }
}

function register(req, res) {
    console.log('register:', req.body);
    setTimeout(() => {
        res.status(200).json({name: 'testName', id: '01'});
    }, 2000);
}

function onlineUsers(req, res) {
    setTimeout(() => {
        // console.log('online');
        res.status(200).json(['user1', 'user2', 'user3', 'user4'])
    }, 1500);
}


module.exports = {auth, register, onlineUsers};