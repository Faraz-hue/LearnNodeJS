
// CREATING REST API using EXPRESS FRAMEWORK

const express = require("express")
// const users = require("./MOCK_DATA.json")
const fs = require("fs")
const mongoose = require("mongoose")
const { type } = require("os")
const { log } = require("console")
const app = express()

const PORT = 8000
mongoose.connect("mongodb://127.0.0.1:27017/YoutubeApp")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("Mongo Error", err))


// Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    }

}, { timestamps: true })

const User = mongoose.model("user", userSchema)

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }))
// Making our own middleware using use function
app.use((req, res, next) => {
    // console.log("hello from middilware 1")
    req.myName = "John Doe"
    next();
})

app.use((req, res, next) => {
    fs.appendFile("log.txt", `\n${Date.now()}: ${req.method}: ${req.path}\n`, (err, data) => {
        next()
    })
})

app.use((req, res, next) => {
    next()
})


app.get("/users", async (req, res) => {
    const allDbUsers = await User.find({})
    const html = `
    <ul>
    ${allDbUsers.map(user => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>`
    res.send(html)
})

// 1. REST API points
app.get("/api/users", async (req, res) => {
    const allDbUsers = await User.find({});

    console.log(req.headers)
    return res.json(allDbUsers)
})
// DYNAMIC PATH PARAMETERS

app.route("/api/users/:id").get(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ msg: "user not Found" })
    return res.json(user);
}).patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" })
    return res.json({
        status: "Success"
    });
}).delete(async (req, res) => {

    await User.findByIdAndDelete(req.params.id)
    return res.json({ status: "Success" })
});

// Question: How we do post request
// Browser by default use GET request

app.post("/api/users", async (req, res) => {
    const body = req.body;

    if (!body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title
    ) {
        return res.status(400).json({ msg: "All filds are required" })
    }
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title
    })
    return res.status(201).json({ msg: "Success" })
});

app.listen(PORT, () => console.log("Servert started at Port" + PORT))
