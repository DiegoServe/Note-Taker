// Dependencies
// [2,2,3].concat([4,4,5]) => [2,2,3,4,4,5]

const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");

// Async Processes
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Setting up Server
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Middleware
app.use(express.static("./public"));

// API Route and "GET" Request
app.get("/api/notes", function (req, res) {
  readFileAsync("db/db.json", "utf8").then(function (data) {
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

// API Route and "POST" Request
app.post("/api/notes", async function (req, res) {
  try {
    const note = req.body;
    const data = await readFileAsync("db/db.json", "utf-8");
    const notes = JSON.parse(data);
    note.id = notes.length + 1;
    notes.push(note);
    await writeFileAsync("db/db.json", JSON.stringify(notes));
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Oh dear, something went wrong");
  }

//   readFileAsync("db/db.bson", "utf-8")
//     .then(function (data) {
//       const notes = JSON.parse(data);
//       note.id = notes.length + 1;
//       notes.push(note);
//       return notes;
//     })
//     .then(function (notes) {
//       writeFileAsync("db/db.json", JSON.stringify(notes))
//         .then(function () {
//             res.sendStatus(200);
//         })
//         .catch(function (err) {
//             console.error(err);
//             res.sendStatus(500)
//         });
//     })
//     .catch(function (err) {
//       console.error(err);
//       res.status(500).send("Oh dear, something went wrong");
//     });
});

// HTML Routes
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Listening
app.listen(PORT, function () {
  console.log("Successfully connected to PORT " + PORT);
});
