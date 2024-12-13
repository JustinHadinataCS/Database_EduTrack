import express from "express";
import db from "./connection.js";

const router = express.Router();

router.get("/data", (req, res) => {
  const query =
    req.session.usertype === "Student"
      ? `
        SELECT 
          s.first_name AS student_firstname, 
          s.last_name AS student_lastname, 
          s.StudentID AS student_id,
          t.first_name AS teacher_firstname, 
          t.last_name AS teacher_lastname, 
          c.class_name AS class_name
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
          s.ClassID = ?`
      : `
        SELECT 
          s.first_name AS student_firstname, 
          s.last_name AS student_lastname, 
          s.StudentID AS student_id,
          t.first_name AS teacher_firstname, 
          t.last_name AS teacher_lastname, 
          c.class_name AS class_name
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
          t.TeacherID = ?`;

  const queryID = req.session.classID;

  db.query(query, [queryID], (err, classData) => {
    if (err) return res.json({ message: "Server Error" });

    if (classData.length > 0) {
      const response = {
        students: classData.map((row) => ({
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
    } else {
      return res.json({});
    }
  });
});

export default router;
