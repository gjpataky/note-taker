const fs = require('fs');
const util = require('util');
const path = require('path');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const router = require('express').Router();
const express = require("express");



//const apiRoutes = require("routes");
//const htmlRoutes = require("./routes/htmlRoutes");
// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3000;



/* get the notes */

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

router.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/notes.html'));
    /*
    readFileAsync('./../db/db.json', 'utf8').then(notes => {
        console.log(notes);
    });*/
});

router.get('/api/notes', function (req, res) {
    console.log(req.body);

    fs.readFile(__dirname + '/db/db.json', (err, data) => {
        let notes = JSON.parse(data);
        res.json(notes);
    });

    //res.json(path.join(__dirname + '/db/db.json'));
    /*
    readFileAsync('./../db/db.json', 'utf8').then(notes => {
        console.log(notes);
    });*/
});

function random(low, high) {
    return Math.random() * (high - low) + low
}

router.post('/api/notes', (req, res) => {
    const newNote = req.body;
    console.log(req.body);

    fs.readFile(__dirname + '/db/db.json', (err, data) => {
        let notes = JSON.parse(data);
        let newNote = req.body;
        newNote.id = Math.floor(random(0, 100));
        notes.push(newNote);
        fs.writeFile(__dirname + '/db/db.json', JSON.stringify(notes), (err) => {
            if (err) throw err;
            console.log('note saved');
        });
    });
    res.send('post sent');
});

router.delete('/api/notes/:id', (req, res) => {
    const idNum = req.params.id;
    console.log("Delete ID");
    console.log(idNum);

    fs.readFile(__dirname + '/db/db.json', (err, data) => {
        let notes = JSON.parse(data);
        var delIndex = 0;
        for (var i = 0; i < notes.length; i++) {
            if (notes[i].id == idNum) {
                console.log("Delete element " + notes[i].id + " " + notes[i].title);
                delIndex = i;
                //delete notes[i];

            }
        }
        notes.splice(notes.indexOf(delIndex), 1);

        /*
        */

        fs.writeFile(__dirname + '/db/db.json', JSON.stringify(notes), (err) => {
            if (err) throw err;
            console.log('note saved');
        });
    });
    res.send('post sent');
});

/*
readFileAsync(path.join(__dirname + '/db/db.json'), 'utf8').then(notes => {
        notes.push(newNote);
        writeFileAsync(path.join(__dirname + '/db/db.json'), JSON.stringify(notes));
    });
*/

/*use this instead:

router.post('/notes', (req, res) => {
  fs.readFile(__dirname + './../db/db.json', (err,data)  => {
      convert json data to array 
      let notes = JSON.parse(data);
      let newNote = req.body;
      notes.push(newNote);
      use normal write file to save to db.json 
      fs.writeFile(__dirname + './../db/db.json', JSON.stringify(notes), (err) => {
        if (err) throw err;
        console.log('note saved');
      });
    });
    res.send('post sent');
});
module.exports = router;
*/


// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//console.log(path.join(__dirname, '/index.js'));
//app.use(express.static(path.join(__dirname, '/index.js')));
app.use("/", router);

//app.use("/index.html", htmlRoutes);
// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));