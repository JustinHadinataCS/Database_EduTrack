/* import express from "express";
import db from "./connection.js";

const router = express.Router();

router.get("/data", (req, res) => {
    
    const query = 
    req.session.usertype === "Student" ? `
    SELECT DISTINCT
        t.first_name AS teacher_firstname,
        t.last_name AS teacher_lastname,
        c.course_name AS name
    FROM
        ClassSchedule cs
    JOIN
        TeacherCourseAssignment tc
    ON
        tc.TeacherCourseID = cs.TeacherCourseID
    JOIN
        Teachers t
    ON
        tc.TeacherID = t.TeacherID
    JOIN
        courses c
    ON
        tc.CourseID = c.courseID
    WHERE
        cs.ClassID = ?`
    :
    `
    SELECT DISTINCT
        cl.class_name AS cl_name,
        c.course_name AS name
    FROM
        ClassSchedule cs
    JOIN
        Class cl
    ON
        cl.ClassID = cs.ClassID
    JOIN
        TeacherCourseAssignment tc
    ON
        tc.TeacherCourseID = cs.TeacherCourseID
    JOIN
        courses c
    ON
        tc.CourseID = c.courseID
    WHERE
        tc.TeacherID = ?`

    const queryID = req.session.usertype === "Student" ? req.session.classID : req.session.TeacherID;

    db.query(query, [queryID], (err, courseData) => {
        if (err) return res.json({ message: "Server Error" });
    
        if (courseData.length > 0) {
            return res.json(courseData);
        } else {
            return res.json({});
        }
        });
  });
  
  export default router;
   */