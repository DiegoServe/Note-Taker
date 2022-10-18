// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");

// Asynch Processes
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
app.get("/api/notes", function(req, res) {
    readFileAsync("db/db.json", "utf8").then(function(data) {
        notes = [].concat(JSON.parse(data))
    })
});

// API Route and "POST" Request
app.post("/api/notes", function(req, res) {
    const note =req.body;
    readFileAsync("db/db.json", "utf-8").then(function(data) {
        const notes = {}.concat(JSON.parse(data));
        note.id = notes.length + 1
        notes.push(note);
        return notes
    }).then(function(notes) {
        writeFileAsync("db/db.json", JSON.stringify(notes))
        res.json(note);
    })
});