import express from "express";
import db from "./connection.js";

const router = express.Router();

// =========================
// Unified Attendance Route
// =========================
router.get("/", (req, res) => {
  console.log("Attendance Route Hit");
  const { studentId, teacherId } = req.query;

  // =========================
  // Teacher Logic (Declare teacherQuery before usage)
  // =========================
  const teacherQuery = `
    SELECT 
      c.course_name, 
      s.session_number, 
      st.StudentID, 
      st.first_name AS student_firstname, 
      st.last_name AS student_lastname
    FROM 
      TeacherCourseAssignment tca
    JOIN 
      Courses c ON tca.CourseID = c.CourseID
    JOIN 
      ClassSchedule cs ON tca.TeacherCourseID = cs.TeacherCourseID
    JOIN 
      Sessions s ON s.ScheduleID = cs.ScheduleID
    JOIN 
      Class cl ON cs.ClassID = cl.ClassID
    JOIN 
      Students st ON st.ClassID = cl.ClassID
    WHERE 
      tca.TeacherID = ?
    ORDER BY 
      c.course_name, s.session_number, st.StudentID;
  `;

  // =========================
  // Student Logic
  // =========================
  if (studentId) {
    console.log("Fetching attendance for Student:", studentId);

    const studentQuery = `
      SELECT
        c.course_name,
        s.session_number,
        COALESCE(a.attendance_status, false) AS attendance_status
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

    db.query(studentQuery, [studentId], (err, attendanceData) => {
      if (err) {
        console.error("Student Attendance Query Error:", err);
        return res
          .status(500)
          .json({ error: "Server Error", details: err.message });
      }

      // Process student data
      const attendanceByCourse = {};
      attendanceData.forEach((row) => {
        const { course_name, session_number, attendance_status } = row;

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
      return res.json(response);
    });

    return; // End the route here for student-specific logic
  }

  // =========================
  // Teacher Logic
  // =========================
  if (teacherId) {
    console.log("Teacher Query Executed:", teacherQuery);
    console.log("Teacher Query Params:", teacherId);

    db.query(teacherQuery, [teacherId], (err, data) => {
      if (err) {
        console.error("Teacher Attendance Query Error:", err);
        return res
          .status(500)
          .json({ error: "Server Error", details: err.message });
      }

      // Process teacher data
      const attendanceByCourse = {};

      data.forEach((row) => {
        const {
          course_name,
          session_number,
          StudentID,
          student_firstname,
          student_lastname,
        } = row;

        if (!attendanceByCourse[course_name]) {
          attendanceByCourse[course_name] = {
            course_name,
            sessions: {},
          };
        }

        if (!attendanceByCourse[course_name].sessions[session_number]) {
          attendanceByCourse[course_name].sessions[session_number] = {
            session_number,
            students: [],
          };
        }

        attendanceByCourse[course_name].sessions[session_number].students.push({
          StudentID,
          student_name: `${student_firstname} ${student_lastname}`,
          attendance_status: false,
          comments: "",
        });
      });

      const response = Object.keys(attendanceByCourse).map((course) => {
        return {
          course_name: attendanceByCourse[course].course_name,
          sessions: Object.values(attendanceByCourse[course].sessions),
        };
      });

      return res.json(response);
    });

    return; // End the route here for teacher-specific logic
  }

  // =========================
  // Missing Parameters
  // =========================
  console.log("No StudentID or TeacherID provided");
  return res
    .status(400)
    .json({ error: "Student ID or Teacher ID is required." });
});

router.post("/data", async (req, res) => {
  const { courseName, sessionNumber, students } = req.body;

  try {
    // Get courseID based on courseName
    const [courseResult] = await db
      .promise()
      .query("SELECT CourseID FROM courses WHERE course_name = ?", [
        courseName,
      ]);
    if (courseResult.length === 0) {
      return res.status(400).json({ message: "Invalid course name" });
    }

    const courseID = courseResult[0].CourseID;

    // Get sessionID based on courseID and sessionNumber
    const [sessionResult] = await db
      .promise()
      .query(
        `SELECT
          s.sessionID
        FROM
          sessions s
        JOIN
          classschedule cs
        ON
          s.scheduleID = cs.scheduleID
        JOIN
          teachercourseassignment tc
        ON
          tc.teachercourseid = cs.teachercourseid
        JOIN
          courses c
        ON
          tc.courseid = c.courseid
        WHERE
          s.session_number = ?
        AND
          c.courseID = ?`,
        [sessionNumber, courseID]
      );
    if (sessionResult.length === 0) {
      return res.status(400).json({ message: "Invalid session number" });
    }

    const sessionID = sessionResult[0].sessionID;

    // Insert or update attendance data
    for (const student of students) {
      await db.promise().query(
        `INSERT INTO attendance (StudentID, SessionID, attendance_status, comments)
         VALUES (?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
         attendance_status = VALUES(attendance_status),
         comments = VALUES(comments)`,
        [
          student.studentID,
          sessionID,
          student.attendance_status,
          student.comment,
        ]
      );
    }

    res.json({ message: "Attendance updated successfully" });
  } catch (error) {
    console.error("Error processing attendance:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/aaaaa", (req, res) => {
  const receivedData = req.body; // Access the sent data
  console.log('Received data:', receivedData);

  // Send a response back to the client
  res.status(200).json({ message: 'Data received successfully', data: receivedData });
});

export default router;
