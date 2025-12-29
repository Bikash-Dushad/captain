const express = require("express")
const app = express()
const port = 3003

app.get("/captain", async (req, res) => {
    return res.send("Hi captain")
})

app.listen(port, () => {
    console.log("server is running on 3003")
})