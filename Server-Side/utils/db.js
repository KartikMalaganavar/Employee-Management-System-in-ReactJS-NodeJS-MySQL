import mysql from 'mysql'

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employeems"
})

con.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL: ' + err.stack);
      return;
    }
  
    console.log('Connected to MySQL as id ' + con.threadId);
  
    // Create database if not exists
    con.query('CREATE DATABASE IF NOT EXISTS employeems', (err) => {
      if (err) throw err;
  
      // Use employeems database
      con.query('USE employeems', (err) => {
        if (err) throw err;
  
        // Insert data into admin table only if it doesn't exist
        con.query(`
          SELECT * FROM admin WHERE email = 'abc@gmail.com' AND password = '123456'`,
          (err, rows) => {
            if (err) throw err;
  
            if (rows.length === 0) {
              // Data doesn't exist, proceed with the INSERT query
              con.query(`
                INSERT INTO admin (email, password)
                VALUES ('abc@gmail.com', '123456')`, (err) => {
                if (err) throw err;
  
                console.log('Admin data inserted successfully.');
              });
            } else {
              // Data already exists, do something else or log a message
              console.log('Admin data already exists.');
            }
          }
        );
  
        // Create category table if not exists
        con.query(`
          CREATE TABLE IF NOT EXISTS category (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL
          )`, (err) => {
          if (err) throw err;
  
        //   console.log('Category table created successfully.');
  
          // Create employee table if not exists
          con.query(`
            CREATE TABLE IF NOT EXISTS employee (
              id INT AUTO_INCREMENT PRIMARY KEY,
              name VARCHAR(30) NOT NULL,
              email VARCHAR(40) NOT NULL,
              password VARCHAR(150) NOT NULL,
              salary INT NOT NULL,
              address VARCHAR(30) NOT NULL,
              image VARCHAR(60) NOT NULL,
              category_id INT NOT NULL,
              FOREIGN KEY (category_id) REFERENCES category(id)
            )`, (err) => {
            if (err) throw err;
  
            // console.log('Employee table created successfully.');
  
            // Close the con
            con.end();
          });
        });
      });
    });
  });

export default con;