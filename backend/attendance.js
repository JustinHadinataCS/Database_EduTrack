import express from "express";
import db from "./connection.js";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("Attendance Route Hit");
  console.log("Query Parameters:", req.query);
  const studentId = req.query.studentId;

  if (!studentId) {
    console.log("No StudentID provided");
    return res.status(400).json({ error: "Student ID is required." });
  }

  const query = `
    SELECT
      c.course_name,
      s.session_number,
      COALESCE(a.attendance_status, false) as attendance_status
    FROM
      Sessions s
    LEFT JOIN
      Attendance a ON a.SessionID = s.SessionID AND a.StudentID = ?
    JOIN
      ClassSchedule cs ON s.ScheduleID = cs.ScheduleID
    JOIN
      TeacherCourseAssignment tca ON cs.TeacherCourseID = tca.TeacherCourseID
    JOIN
      Courses c ON tca.CourseID = c.CourseID
    ORDER BY
      c.course_name, s.session_number;
  `;

  db.query(query, [studentId], (err, attendanceData) => {
    if (err) {
      console.error("Attendance Query Error:", err);
      return res
        .status(500)
        .json({ error: "Server Error", details: err.message });
    }

    // Log raw data for debugging
    console.log("Raw Attendance Data:", attendanceData);
    console.log("Number of Attendance Records:", attendanceData.length);

    try {
      const attendanceByCourse = {};
      attendanceData.forEach((row) => {
        const { course_name, session_number, attendance_status } = row;

        // Log each row for detailed debugging
        console.log("Processing Row:", {
          course_name,
          session_number,
          attendance_status,
        });

        if (!attendanceByCourse[course_name]) {
          attendanceByCourse[course_name] = {
            course_name,
            sessions: [],
          };
        }

        attendanceByCourse[course_name].sessions.push({
          session_number,
          attendance_status,
        });
      });

      const response = Object.values(attendanceByCourse);

      // Log the final processed response
      console.log("Processed Attendance Response:", response);

      res.json(response);
    } catch (processError) {
      console.error("Error processing attendance data:", processError);
      res
        .status(500)
        .json({
          error: "Error processing attendance data",
          details: processError.message,
        });
    }
  });
});

export default router;
