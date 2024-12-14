import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAttendance } from "../contexts/AttendanceContext";

const TeacherDropdown = () => {
  const { attendanceData } = useAttendance(); // Access context
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const navigate = useNavigate();

  // Find sessions for selected course
  const selectedCourseData = attendanceData.find(
    (course) => course.course_name === selectedCourse
  );

  const handleViewAttendance = () => {
    if (selectedCourse && selectedSession) {
      navigate(`/attendance/teacher/${selectedCourse}/${selectedSession}`);
    }
  };

  return (
    <div className="flex gap-4 items-center">
      {/* Course Dropdown */}
      <select
        value={selectedCourse}
        onChange={(e) => {
          setSelectedCourse(e.target.value);
          setSelectedSession(""); // Reset session on course change
        }}
        className="bg-[#1d1d1d] text-white px-4 py-2 rounded-md cursor-pointer"
      >
        <option value="" disabled>
          Select Course
        </option>
        {attendanceData.map((course) => (
          <option key={course.course_name} value={course.course_name}>
            {course.course_name}
          </option>
        ))}
      </select>

      {/* Session Dropdown */}
      <select
        value={selectedSession}
        onChange={(e) => setSelectedSession(e.target.value)}
        className="bg-[#1d1d1d] text-white px-4 py-2 rounded-md cursor-pointer"
        disabled={!selectedCourse}
      >
        <option value="" disabled>
          Select Session
        </option>
        {selectedCourseData?.sessions.map((session) => (
          <option key={session.session_number} value={session.session_number}>
            Session {session.session_number}
          </option>
        ))}
      </select>

      <button
        onClick={handleViewAttendance}
        disabled={!selectedCourse || !selectedSession}
        className="bg-[#3ECF8E] text-black px-4 py-2 rounded-md cursor-pointer disabled:opacity-50"
      >
        View Attendance
      </button>
    </div>
  );
};

export default TeacherDropdown;
