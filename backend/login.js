import express from "express";
import db from "./connection.js";

const router = express.Router();

router.post("/", (req, res) => {
  const studentQuery = `
    SELECT 
      s.StudentID,
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

  const teacherQuery = `
    SELECT 
      tc.TeacherID, 
      tc.teacher_email, 
      tc.teacher_password, 
      t.first_name, 
      t.last_name, 
      c.classID
    FROM 
      teacher_credentials tc
    JOIN 
      teachers t 
    ON 
      tc.TeacherID = t.TeacherID
    JOIN 
      class c 
    ON 
      tc.TeacherID = c.TeacherID
    WHERE 
      tc.teacher_email = ? AND tc.teacher_password = ?`;

  // Debug: Log the request body
  console.log("Request Body:", req.body);

  db.query(
    studentQuery,
    [req.body.email, req.body.password],
    (err, studentData) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ message: "Server Error" });
      }

      console.log("Student Query Result:", studentData);

      if (studentData.length > 0) {
        req.session.StudentID = studentData[0].StudentID;
        req.session.firstname = studentData[0].first_name;
        req.session.lastname = studentData[0].last_name;
        req.session.classID = studentData[0].classID;
        req.session.usertype = "Student";
        return res.json({ Login: true });
      }

      // Check for Teacher credentials
      db.query(
        teacherQuery,
        [req.body.email, req.body.password],
        (err, teacherData) => {
          if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ message: "Server Error" });
          }

          console.log("Teacher Query Result:", teacherData);

          if (teacherData.length > 0) {
            req.session.TeacherID = teacherData[0].TeacherID;
            req.session.firstname = teacherData[0].first_name;
            req.session.lastname = teacherData[0].last_name;
            req.session.classID = teacherData[0].classID;
            req.session.usertype = "Teacher";
            return res.json({ Login: true });
          } else {
            return res.json({ Login: false });
          }
        }
      );
    }
  );
});

router.get("/", (req, res) => {
  if (req.session.usertype === "Student") {
    return res.json({
      valid: true,
      firstname: req.session.firstname,
      lastname: req.session.lastname,
      usertype: req.session.usertype,
      StudentID: req.session.StudentID,
    });
  }
  if (req.session.usertype === "Teacher") {
    return res.json({
      valid: true,
      firstname: req.session.firstname,
      lastname: req.session.lastname,
      usertype: req.session.usertype,
      TeacherID: req.session.TeacherID,
    });
  } else {
    return res.json({ valid: false });
  }
});

export default router;
