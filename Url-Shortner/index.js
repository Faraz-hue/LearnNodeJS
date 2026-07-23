const express = require("express")
const cookieParser = require("cookie-parser")
const URL = require("./models/url")
const { connectToMongoDB } = require("./connect")
const path = require("path")
const app = express()
const PORT = 8001
const { restrictToLoggedInUserOnly, checkAuth } = require("./middleware/auth")
const staticRoute = require("./routes/staticRouter")
const urlRoute = require("./routes/url")
const userRoute = require("./routes/user")

connectToMongoDB("mongodb://localhost:27017/short-url")
    .then(() => console.log("Mongo DB connected"))
    .catch(err => console.error(err));

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use("/url", restrictToLoggedInUserOnly, urlRoute)
app.use("/user", userRoute)
app.use("/", checkAuth, staticRoute)

app.get("/url/:shortId", restrictToLoggedInUserOnly, async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                },
            },
        },
    );
    if (!entry) {
        return res.status(404).send("Short URL not found");
    }

    res.redirect(entry.redirectURL);
})
app.listen(PORT, () => console.log(`Server started successfull at PORT ${PORT}`))