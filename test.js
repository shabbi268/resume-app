const {Client} = require('pg')


const client = new Client({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "test"
})

console.log("start");



client .connect()
.then(() => console.log("Connecetd succesfully"))
.then(() => client.query("DROP TABLE users; DROP TABLE managers"))
.then(() => console.log("Dropped users and managers"))
.then(() => client.query("CREATE TABLE users (firstname character varying(50),lastname character varying(50),email character varying(50),position character varying(50),file character varying(50), show character varying(2))"))
.then(() => client.query("CREATE TABLE managers (username character varying(50),password character varying(1000))"))
.then(() => console.log("Users and managers tables Created"))
.then(() => client.query("INSERT INTO users values ('Shabbi','Kesa','kesash@mail.uc.edu','A', 'Sample Path1', 'S')"))
.then(() => client.query("INSERT INTO users values ('Shabbi1','Kesa','kesash@mail.uc.edu','A','Sample Path2', 'S')"))
.then(() => client.query("INSERT INTO users values ('Shabbi2','Kesa','kesash@mail.uc.edu','A','Sample Path3', 'S')"))
.then(() => client.query("INSERT INTO users values ('Shabbi3','Kesa','kesash@mail.uc.edu','A','Sample Path4', 'S')"))
.then(() => client.query("INSERT INTO users values ('Shabbi4','Kesa','kesash@mail.uc.edu','A','Sample Path5', 'S')"))
// .then(() => client.query("INSERT INTO managers values ('test1','test123')"))
// .then(() => client.query("INSERT INTO managers values ('test2','test234')"))
// .then(() => client.query("INSERT INTO managers values ('test3','test345')"))
// .then(() => client.query("INSERT INTO managers values ('test4','test456')"))
.then(() => console.log("5 User and 0 managers Inserted"))
.catch(e => console.log(e))
.finally()

module.exports = client;

