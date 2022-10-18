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