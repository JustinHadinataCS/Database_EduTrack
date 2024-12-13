import express from "express";
import db from "./connection.js";

const router = express.Router();

router.get("/data", (req, res) => {
    const query = 
    req.session.usertype === "Student"
    ?
    `SELECT 
        c.course_name as name,
        cs.start_time as startTime,
        cs.end_time as endTime,
        cs.day_of_week as day
    FROM 
        ClassSchedule cs
    JOIN 
        TeacherCourseAssignment tc
    ON 
        cs.TeacherCourseID = tc.TeacherCourseID
    JOIN 
        courses c 
    ON 
        tc.CourseID = c.CourseID
    WHERE 
        cs.ClassID = ?`

      : `

    SELECT 
        c.course_name as name,
        cs.start_time as startTime,
        cs.end_time as endTime,
        cs.day_of_week as day
    FROM 
        ClassSchedule cs
    JOIN 
        TeacherCourseAssignment tc
    ON 
        cs.TeacherCourseID = tc.TeacherCourseID
    JOIN 
        courses c 
    ON 
        tc.CourseID = c.CourseID
    WHERE 
        tc.TeacherID = ?`

    const queryID = 
    req.session.usertype === "Student"
    ?req.session.classID
    :req.session.TeacherID;

    db.query(query, [queryID], (err, scheduleData) => {
        if (err) return res.json({ message: "Server Error" });
    
        if (scheduleData.length > 0) {
          return res.json(scheduleData);
        } else {
          return res.json({});
        }
      });
});

export default router;