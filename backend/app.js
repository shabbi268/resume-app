const client = require('/Users/shabarishkesa/resume-app/test.js')
const express = require('express');
const bodyParser = require("body-parser");
const knex = require('./knex');
const app = express();
const multer = require('multer');
const bcrypt = require('bcrypt');
const path = require('path');

var store = multer.diskStorage({
    destination : function(req, file, next) {
      next(null, './Resumes');
    },
    filename: function (req, file, next) {
      next(null, 'Resume' + '-' + Date.now() + path.extname(file.originalname));
    }
  });

var upload = multer({storage: store});

const bookshelf = require('bookshelf')(knex)
const User = bookshelf.model('User', {
  tableName: 'users',
})

const Manager = bookshelf.model('Manager', {
  tableName: 'managers',
})



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});

app.get('/', (req, res) => {
  res.send('/Users/shabarishkesa/resume-app/src/index.html');
});

app.post("/api/submitform", (req, res, next) => {
  const userform = req.body;
  // console.log(userform.email);
  User.forge({ firstname: userform.firstname, lastname: userform.lastname, email: userform.email, position: userform.position, file: userform.file, show: 'S'}).save().then((User) => {
  })
  return userform;
});


app.put("/api/deleteuser", (req, res, next) =>{
  const usr = req.body;
  User
    .where({firstname: usr.firstname, lastname: usr.lastname})
    .save({show: 'NS'},{patch:true})
    .then(function(x) {
      // console.log('User deleted sucessfully');
    });
});


app.get("/api/submitform", (req, res, next) => {
  User.fetchAll().then((users) => {
    res.status(200).send(users);
  })
});

// app.post("/api/manager", (req, res, next) => {
//   const mgr = req.body;
//   console.log(mgr.password);
//   Manager
//     .where({username: mgr.username})
//     .fetch().then((managers) => {
//     bcrypt.compare(mgr.password, managers.password, function(err, res) {
//       console.log(res.body);
//       return res;
//     })
//     res.status(200).send(managers);
//   })
// });



app.get("/api/managerlist", (req, res, next) => {
    bcrypt.hash("admin", 10, function(err, hash) {
      Manager.forge({ username: 'admin', password: hash}).save()
    });
    bcrypt.hash("admin1", 10, function(err, hash1) {
      Manager.forge({ username: 'admin1', password: hash1}).save()
    });
    Manager.forge({ username: 'admin', password: 'admin'}).save()
    Manager.forge({ username: 'admin2', password: 'admin2'}).save()
    Manager.fetchAll().then((managers) => {
      // console.log('two managers added and fetchall mgrlist');
      res.status(200).send(managers);
    })
});

app.post("/api/uploadfile", upload.single("file"), (req, res, next) => {
    const file = req.file;
    const data = req.body['firstname'];
    // console.log(data);
    // console.log(file.path);
      if (!file) {
        console.log(err)
        return res.status(422).send("An Error Occured");
      }
      res.send(file)
});


module.exports = app;

