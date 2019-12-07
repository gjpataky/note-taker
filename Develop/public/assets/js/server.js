const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const router = require('express').Router();
/* get the notes */
router.get('/notes', (req, res) => {
    readFileAsync('./../db/db.json', 'utf8').then(notes => {
    });
});
router.post('/notes', (req, res) => {
    const newNote = req.body;
    readFileAsync('./../db/db.json', 'utf8').then(notes => {
        notes.push(newNote);
        writeFileAsync('./../db/db.json', JSON.stringify(notes));
    });
});

const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3000;
// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);
// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));