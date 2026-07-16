const fs = require("fs")

// Sync
// fs.writeFileSync("./text.txt", "Hello world")

// ASYNC
fs.writeFile("./test.docx", "Hello ASYNC That takes a callback fuction as argument", (err) => { })