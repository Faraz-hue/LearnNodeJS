
const { Router } = require("express")
const router = Router();
const User = require("../models/user")

router.get("/signin", (req, res) => {
    return res.render("signin")
})

router.get("/signup", (req, res) => {
    return res.render("signup")
})

router.post("/signin", async (req, res) => {
    const { email, password } = req.body
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password)
        return res.cookie("token", token).redirect("/")
    }
    catch (error) {
        return res.render("signin", {
            error: "Incorrect email or Password"
        })
    }
})

router.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/")
})

router.post("/signup", async (req, res) => {
    console.log("SIGNUP ROUTE HIT");

    try {
        const { fullName, email, password } = req.body;

        console.log("SIGNUP DATA:", req.body);

        const user = await User.create({
            fullName,
            email,
            password,
        });

        console.log("CREATED USER:", user);

        return res.redirect("/");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Signup failed");
    }
});
module.exports = router