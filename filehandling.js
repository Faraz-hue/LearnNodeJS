const fs = require("fs")

// Sync
// fs.writeFileSync("./text.txt", "Hello world")

// ASYNC
// fs.writeFile("./test.docx", "Hello ASYNC That takes a callback fuction as argument", (err) => { })

// Synchronous works weel as it returns 
// const read = fs.readFileSync("./text.txt", "UTF-8")
// console.log(read)

// But asynchronous 
fs.readFile("./test.docx", "UTF-8")