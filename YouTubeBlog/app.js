require("dotenv").config()
const PORT = process.env.PORT || 8000;
const express = require("express")
const app = express()
const path = require("path")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")

const userRoute = require("./routes/user")
const blogRoute = require("./routes/blog")

const Blog = require("./models/blog")

const { checkForAuthenticationCookie } = require("./middlewares/authentication")

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB Connected"))

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))
const methodOverride = require("method-override");
app.use(express.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(cookieParser())
// Authentication middleware
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve("./public")))


app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({});

    return res.render("home", {
        user: req.user,
        array: allBlogs,
    });
});

app.use("/user", userRoute)
app.use("/blog", blogRoute)

app.listen(PORT, () => console.log("Server Started at PORT 8000"))