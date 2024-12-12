import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "school",
});

export const queryDB = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

export default db;
