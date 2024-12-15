import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAttendance } from "../contexts/AttendanceContext";
import TeacherDropdown from "./TeacherDropdown";
import axios from "axios"; // Import axios for POST requests

const TeacherAttendanceContainer = () => {
  const { teacherId, courseName, sessionNumber } = useParams();
  const { attendanceData, fetchAttendanceData } = useAttendance();
  const [selectedSession, setSelectedSession] = useState("");
  const [courseData, setCourseData] = useState(null);
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    if (courseName && teacherId) {
      fetchAttendanceData(courseName, teacherId);
    }
  }, [courseName, teacherId, fetchAttendanceData]);

  useEffect(() => {
    if (attendanceData.length > 0) {
      const course = attendanceData.find(
        (course) =>
          course.course_name.toLowerCase() === courseName.toLowerCase()
      );
      setCourseData(course);
    }
  }, [attendanceData, courseName]);

  useEffect(() => {
    if (courseData && sessionNumber) {
      const session = courseData.sessions.find(
        (s) => s.session_number === parseInt(sessionNumber, 10)
      );
      setSessionData(session);
      setSelectedSession(parseInt(sessionNumber, 10));
    }
  }, [courseData, sessionNumber]);

  const handleAttendanceToggle = (studentID) => {
    setSessionData((prevData) => ({
      ...prevData,
      students: prevData.students.map((student) =>
        student.StudentID === studentID
          ? { ...student, attendance_status: !student.attendance_status }
          : student
      ),
    }));
  };

  const handleCommentChange = (studentID, comment) => {
    setSessionData((prevData) => ({
      ...prevData,
      students: prevData.students.map((student) =>
        student.StudentID === studentID ? { ...student, comment } : student
      ),
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8800/attendance/data/",
        {
          courseName,
          sessionNumber: selectedSession,
          students: sessionData.students.map((student) => ({
            studentID: student.StudentID,
            attendance_status: student.attendance_status,
            comment: student.comment || "",
          })),
        }
      );
      console.log("Attendance submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting attendance:", error);
    }
  };

  return (
    <div className="flex flex-col gap-y-5 px-10 py-5">
      <h1 className="text-[#3ECF8E] text-[25px]">
        Teacher Attendance Management
      </h1>

      <div className="flex">
        <TeacherDropdown onSessionSelect={setSelectedSession} />
      </div>

      {sessionData ? (
        <div className="flex p-8 gap-x-10 rounded-lg bg-[#1d1d1d] flex-col border">
          {sessionData.students?.map((student) => (
            <div
              key={student.StudentID}
              className="flex justify-between font-bold text-lg text-white border"
            >
              <div className="flex gap-x-4">
                <div></div>
                <div>{student.StudentID}</div>
                <div>{student.student_name}</div>
                <div className="flex justify-end border">
                  <button
                    onClick={() => handleAttendanceToggle(student.StudentID)}
                    className={`px-4 py-2 rounded ${
                      student.attendance_status ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {student.attendance_status ? "Present" : "Absent"}
                  </button>
                </div>
              </div>
              <div>
                <select
                  value={student.comment || ""}
                  onChange={(e) =>
                    handleCommentChange(student.StudentID, e.target.value)
                  }
                  className="bg-[#1d1d1d] text-white px-4 py-2 rounded-md"
                >
                  <option value="">No Comments</option>
                  <option value="Sick">Sick</option>
                  <option value="Other Reason">Other Reason</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>
            </div>
          ))}
          <button
            onClick={handleSubmit}
            className="bg-[#3ECF8E] text-black px-4 py-2 rounded-md mt-4"
          >
            Submit Attendance
          </button>
        </div>
      ) : (
        <div className="text-white text-lg">Please select a session</div>
      )}
    </div>
  );
};

export default TeacherAttendanceContainer;
