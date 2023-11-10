const mysql2 = require("mysql2");
require("dotenv").config();

const pool = mysql2.createPool({
  // socketPath: "/Applications/MAMP/tmp/mysql2/mysql2",
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.MYSQL_DB,
  connectionLimit: 10,
});

pool.getConnection(function (err, connection) {
  console.log("database connected");
});

let registration = `CREATE TABLE IF NOT EXISTS registration(
  user_id INT AUTO_INCREMENT, 
  user_name VARCHAR(255) NOT NULL, 
  user_email VARCHAR (255) NOT NULL, 
  user_password VARCHAR(255) NOT NULL, 
  PRIMARY KEY(user_id)
  )`;

let profile = `CREATE TABLE IF NOT EXISTS profile(
  user_profile_id INT AUTO_INCREMENT,
  user_id INT NOT NULL,
  first_name VARCHAR (255) NOT NULL, 
  last_name VARCHAR (255) NOT NULL,
  PRIMARY KEY( user_profile_id ),
  FOREIGN KEY(user_id) REFERENCES registration(user_id)
)`;

let question = `CREATE TABLE if not exists question(
  question_id int auto_increment,
  question varchar(255) not null,
  question_description varchar(255) not null,
  user_id int not null,        
  PRIMARY KEY (question_id),
  FOREIGN KEY (user_id) REFERENCES registration(user_id)
)`;

let answer = `CREATE TABLE IF NOT EXISTS answer (
    answer_id INT AUTO_INCREMENT,
    answer_text VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    question_id INT NOT NULL,
    PRIMARY KEY (answer_id),
    FOREIGN KEY (user_id) REFERENCES registration(user_id),
    FOREIGN KEY (question_id) REFERENCES question(question_id)
    )`;

pool.query(registration, (err, results) => {
  if (err) throw err;
  console.log("registrtion table created");
});
pool.query(profile, (err, results) => {
  if (err) throw err;
  console.log("profile, table created");
});

pool.query(question, (err, results2) => {
  if (err) throw err;
  console.log("question, table created");
});
pool.query(answer, (err, results2) => {
  if (err) throw err;
  console.log("answer, table created");
});

module.exports = pool;
