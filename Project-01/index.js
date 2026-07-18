
// CREATING REST API using EXPRESS FRAMEWORK

const express = require("express")
const users = require("./MOCK_DATA.json")

const app = express()
const PORT = 8000

app.get("/users", (req, res) => {
    const html = `
    <ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>`
    res.send(html)
})
// 1. REST API points
app.get("/api/users", (req, res) => {
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
    // TODO: EDITE the user with given id
    return res.json({ status: "pending" })
}).delete((req, res) => {
    // TODO: DELETE the user with given id
    return res.json({ status: "pending" })
})

// Question: How we do post request
// Browser by default use GET request

app.post("/api/users", (req, res) => {
    // TODO: Create new uses
    res.json({ status: "pending" })
})

app.listen(PORT, () => console.log("Servert started at Port" + PORT))
