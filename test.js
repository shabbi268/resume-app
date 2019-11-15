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
.then(() => client.query("DROP TABLE users"))
.then(() => console.log("Dropped users"))
.then(() => client.query("CREATE TABLE users (firstname character varying(50),lastname character varying(50),email character varying(50),position character varying(50))"))
.then(() => console.log("Users table Created"))
.then(() => client.query("INSERT INTO users values ('Shabbi','Kesa','kesash@mail.uc.edu','A')"))
.then(() => console.log("1 User Inserted"))
.catch(e => console.log(e))
.finally()



module.exports = client;

