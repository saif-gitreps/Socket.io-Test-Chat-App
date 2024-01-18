const express = require("express");

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

app.get("/", (req, res) => {
   res.sendFile("index.html");
});

app.listen(3000, () => {
   console.log("Server is running on port 3000");
});
