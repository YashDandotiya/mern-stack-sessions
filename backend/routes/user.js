const express = require('express');
const controller = require('../controllers/users-controller');
const checkAuth = require('../middleware/checkAuth');
const route = express.Router();

route.get('/', controller.userfetch);
route.post('/signup', controller.userSignup);
route.post('/login', controller.userlogin);
route.post('/logout', controller.userLogout);
route.get('/protected-route', checkAuth, (req, res) => {
    res.status(200).json({ message: 'You have access to this protected route' });
});

module.exports = route;
