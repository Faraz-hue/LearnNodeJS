const { validateToken } = require("../services/authentication")


function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];

        console.log("Cookies:", req.cookies);

        if (!tokenCookieValue) {
            console.log("No token cookie found");
            return next();
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            console.log("User payload:", userPayload);
            req.user = userPayload;
        } catch (error) {
            console.error("Token validation failed:", error.message);
        }

        next();
    };
}

module.exports = {
    checkForAuthenticationCookie,
}