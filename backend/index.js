import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "school",
});
const queryDB = (query) => {
  return new Promise((resolve, reject) => {
    db.query(query, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

app.get("/", (req, res) => {
  res.json("Hello this is the backend");
});

//GET METHOD TOTAL
app.get("/students/total", async (req, res) => {
  try {
    const query = "SELECT COUNT(*) AS totalStudents FROM students";
    const result = await queryDB(query);
    res.json(result[0].totalStudents);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to get total teachers
app.get("/teachers/total", async (req, res) => {
  try {
    const query = "SELECT COUNT(*) AS totalTeachers FROM teachers";
    const result = await queryDB(query);
    res.json(result[0].totalTeachers);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to get attendance overview
app.get("/attendance/overview", async (req, res) => {
  try {
    const query = `
      SELECT 
        ROUND(SUM(CASE WHEN Attendance_Status = true THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS percentPresent,
        ROUND(SUM(CASE WHEN Attendance_Status = false THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS percentAbsent
      FROM Attendance
    `;
    const result = await queryDB(query);
    res.json(result[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});

// app.get("/students/total", (req, res) => {
//   const q = "SELECT COUNT(*) AS totalStudents FROM students";

//   db.query(q, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data[0].totalStudents);
//   });
// });

app.listen(8800, () => {
  console.log("Connected to backend!");
});
