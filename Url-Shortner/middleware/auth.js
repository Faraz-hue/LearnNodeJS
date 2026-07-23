const { getUser } = require("../service/auth");

function restrictToLoggedInUserOnly(req, res, next) {
    const token = req.cookies?.uid;

    if (!token) {
        return res.redirect("/login");
    }

    const user = getUser(token);

    if (!user) {
        return res.redirect("/login");
    }

    req.user = user;
    next();
}

function checkAuth(req, res, next) {
    const token = req.cookies?.uid;
    const user = getUser(token);
    req.user = user || null;

    next();
}

module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth,
};
