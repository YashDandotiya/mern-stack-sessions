const checkAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.status(400).json({ message: 'Not authenticated' });
    }
    next(); // Call next() to pass control to the next middleware or route handler
};

module.exports = checkAuth;
