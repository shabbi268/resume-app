const client = require('/Users/shabarishkesa/resume-app/test.js')
const express = require('express');
const bodyParser = require("body-parser");
const knex = require('./knex');
const app = express();
const multer = require('multer');


var store = multer.diskStorage({
    destination : function(req, file, next) {
      next(null, '../public');
    },
    filename: function (req, file, next) {
      next(null, Date.now()+ '_'+file.fieldname);
    }
  });

var upload = multer({storage: store}).single('file');

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
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.get('/', (req, res) => {
  res.render('/Users/shabarishkesa/resume-app/src/index.html');
});

app.post("/api/submitform", (req, res, next) => {
  const userform = req.body;
  User.forge({ firstname: userform.firstname, lastname: userform.lastName, email: userform.email, position: userform.position}).save().then((User) => {
  })
  return userform;
});

app.post("/api/managerlist", (req, res, next) => {
  const mgr = req.body;
  console.log('in app.js managerlist app.post');
  client.query('SELECT * FROM managers WHERE username = $1 and password =$2',[mgr.username, mgr.password],
   (err, result) => {
    if (err) {
      console.log('error');
      res.status(200).send(err.body);
    }
    else {
      console.log(result.rows);
      res.status(200).send(result.rows);
    }
  })
  return mgr;
});

app.get("/api/submitform", (req, res, next) => {
  User.fetchAll().then((users) => {
    res.status(200).send(users);
  })
});

  app.get("/api/managerlist", (req, res, next) => {
    Manager.fetchAll().then((mgrs) => {
      res.status(200).send(mgrs);
    })
  });

  app.post("/api/uploadfile", function(req, res) {
    upload(req, res, function(err) {
      if (err) {
        return res.status(501).json({error: err});
      }
      return res.json('uploaded sucess');
    });
  });

module.exports = app;

