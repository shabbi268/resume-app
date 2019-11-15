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
  const existname = '';
  client.query('SELECT * FROM users WHERE firstname = $1', [userform.firstname], (err, result) => {(result.rows.firstname == existname)})
  console.log(existname);
  if (this.existname == userform.firstname) {
    console.log(result);
    console.log("User  there");
    next();
  }
  else {
  console.log("User note there");
  client.query('INSERT INTO users (firstname, lastname, email, position) VALUES ($1, $2, $3, $4)', [userform.firstname, userform.lastname, userform.email, userform.position],
   (err, result) => {
    if (err) {
      res.status(200).send(err.body);
    }
    else {
      res.status(200).send(result.rows);
    }
  })}
});

app.get("/api/submitform", (req, res, next) => {
    client.query('SELECT * FROM users', (err, result) => {
      if (err) {
        console.log(err);
      }
      res.status(200).send(result.rows);
    })
  });

module.exports = app;

