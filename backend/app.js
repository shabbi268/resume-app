const client = require('/Users/shabarishkesa/resume-app/test.js')
const express = require('express');
const bodyParser = require("body-parser");

const app = express();

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

app.post("/api/submitform", (req, res, next) => {
  const userform = req.body;
  client.query('INSERT INTO users (firstname, lastname, email, position) VALUES ($1, $2, $3, $4)', [userform.firstname, userform.lastname, userform.email, userform.position],
   (err, result) => {
    if (err) {
      res.status(200).send(err.body);
    }
    else {
      res.status(200).send(result.rows);
    }
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
    client.query('SELECT * FROM users', (err, result) => {
      if (err) {
        console.log(err);
      }
      res.status(200).send(result.rows);
    })
  });

  app.get("/api/managerlist", (req, res, next) => {
    client.query('SELECT * FROM managers', (err, result) => {
      if (err) {
        console.log(err);
      }
      res.status(200).send(result.rows);
    })
  });


module.exports = app;

