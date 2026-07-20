
// CREATING REST API using EXPRESS FRAMEWORK

const express = require("express")
const users = require("./MOCK_DATA.json")
const fs = require("fs")
const app = express()
const PORT = 8000
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
    // console.log("hello from middilware 2", req.myName)
    // return res.end("Hey")
    next()
})


app.get("/users", (req, res) => {
    const html = `
    <ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>`
    res.send(html)
})

// 1. REST API points
app.get("/api/users", (req, res) => {
    // res.setHeader("X-myName", "jaguar")
    console.log(req.headers)
    return res.json(users)
})
// DYNAMIC PATH PARAMETERS

app.route("/api/users/:id").get((req, res) => {
    // GET ID FIRST
    const id = Number(req.params.id);
    // FIND IN JSON Second step
    const user = users.find((user) => user.id === id
    )
    return res.json(user);
}).patch((req, res) => {
    const id = Number(req.params.id);
    const body = req.body;

    const user = users.findIndex(user => user.id === id);

    if (user === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    // Update only the fields sent in the request
    users[user] = {
        ...users[user],
        ...body
    };

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({
                message: "Error updating user"
            });
        }

        return res.json({
            message: "User updated successfully",
            user: users[index]
        });
    });
}).delete((req, res) => {
    const id = Number(req.params.id);

    const user = users.findIndex(user => user.id === id);

    if (user === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    users.splice(user, 1);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({
                message: "Error deleting user"
            });
        }

        return res.json({
            message: "User deleted successfully",
            users
        });
    });
});

// Question: How we do post request
// Browser by default use GET request

app.post("/api/users", (req, res) => {
    const body = req.body;

    users.push({ id: users.length + 1, ...body });

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({ status: "success", id: users.length })
    });
});

app.listen(PORT, () => console.log("Servert started at Port" + PORT))
