const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const { spawn } = require("child_process");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/js", (req, res) => {
  res.sendFile(__dirname + "/bundle.js");
});

app.post("/", (req, res) => {
  const data1 = req.body.data;
  console.log(data1);

  const python = spawn("python", ["tell_me_about.py", data1]);
  console.log("Data send to pyhton");
  python.stdout.on("data", (data) => {
    console.log(`${data}`);
  });
  python.stderr.on("data", (data) => {
    console.error(`error: ${data}`);
  });
  python.on("close", (data) => {
    console.log(`Child Process exited with code: ${data}`);
  });
  res.send(200);
});

app.listen(3000, () => {
  console.log(" listening on port 3000!");
});
