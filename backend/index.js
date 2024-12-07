import express from "express";
import session from "express-session";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from "cors";
import mysql from "mysql2";

const app = express();
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["POST", "GET"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json())
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24
  }
}))


// CONNECTING TO MYSQL SERVER
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
<<<<<<< Updated upstream
  password: "1234",
=======
  password: "password",
>>>>>>> Stashed changes
  database: "school",
});

// FUNCTION TO GIVE QUERIES TO MYSQL
const queryDB = (query) => {
  return new Promise((resolve, reject) => {
    db.query(query, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

// BACKEND TEST
app.get("/", (req, res) => {
  res.json("Hello this is the backend");
});

// LOGIN FORM
app.post("/login", (req, res) => {
  const student_query = `
  SELECT 
    sc.student_email, 
    sc.student_password, 
    s.first_name, 
    s.last_name,
    s.classID 
  FROM 
    student_credentials sc
  JOIN 
    students s 
  ON 
    sc.StudentID = s.StudentID
  WHERE 
    sc.student_email = ? AND sc.student_password = ?`;

  const teacher_query = `
  SELECT 
    tc.teacher_email, 
    tc.teacher_password, 
    t.first_name, 
    t.last_name 
  FROM 
    teacher_credentials tc
  JOIN 
    teachers t 
  ON 
    tc.TeacherID = t.TeacherID
  WHERE 
    tc.teacher_email = ? AND tc.teacher_password = ?`;
  
  db.query(student_query, [req.body.email, req.body.password], (err, studentData) => {
    if(err) return res.json({ message: 'Server Error' });

    if(studentData.length > 0){
      req.session.firstname = studentData[0].first_name;
      req.session.lastname = studentData[0].last_name;
      req.session.classID = studentData[0].classID;
      req.session.usertype = "Student";
      return res.json({Login: true});
    } 
    
    db.query(teacher_query, [req.body.email, req.body.password], (err, teacherData) => {
      if (err) return res.json({ message: "Server Error" });

      if (teacherData.length > 0) {
        req.session.firstname = teacherData[0].first_name;
        req.session.lastname = teacherData[0].last_name;
        req.session.usertype = "Teacher";
        return res.json({Login: true,});
      }
      else{
        return res.json({Login: false});
      }
    })
  });
});

app.get("/login", (req, res) => {
  if(req.session.firstname){
    return res.json({valid: true, firstname: req.session.firstname, lastname: req.session.lastname, usertype: req.session.usertype})
  }
  else{
    return res.json({valid: false})
  }
});

//GET METHOD TO DISPLAY CLASS INFORMATION
app.get("/class/data", async (req, res) => {
  const query = `
  SELECT 
    s.first_name AS student_firstname, 
    s.last_name AS student_lastname, 
    s.StudentID AS student_id,
    t.first_name AS teacher_firstname, 
    t.last_name AS teacher_lastname, 
    c.class_name class_name
  FROM 
    students s
  JOIN
    class c
  ON
    c.ClassID = s.ClassID
  JOIN
    teachers t
  ON
    t.TeacherID = c.TeacherID
  WHERE 
    s.ClassID = ?`;

  const classID = req.session.classID

  db.query(query, [classID], (err, classData) => {
    if (err) return res.json({ message: "Server Error" });

    if (classData.length > 0) {
      const response = {
        students: classData.map(row => ({
          firstName: row.student_firstname,
          lastName: row.student_lastname,
          id: row.student_id,
        })),
        teacher: {
          firstName: classData[0].teacher_firstname,
          lastName: classData[0].teacher_lastname,
        },
        className: classData[0].class_name,
      };

      return res.json(response);
    }
    else{
      return res.json({});
    }
  })
   
});

/* app.get("/class/teacher", async (req, res) => {
  try {
    const query = "SELECT first_name, last_name FROM students WHERE ";
    const result = await queryDB(query);
    res.json(result[0].totalStudents);
  } 
  
  catch (err) {
    res.status(500).json(err);
  }
});

app.get("/class/teacher", async (req, res) => {
  try {
    const query = "SELECT first_name, last_name FROM students WHERE ";
    const result = await queryDB(query);
    res.json(result[0].totalStudents);
  } 
  
  catch (err) {
    res.status(500).json(err);
  }
}); */

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
