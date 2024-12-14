import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAttendance } from "../contexts/AttendanceContext";

const TeacherAttendanceView = () => {
  const { courseName, sessionNumber } = useParams();
  const { attendanceData } = useAttendance();

  // Memoized data filtering
  const sessionData = useMemo(() => {
    const sessionNum = Number(sessionNumber);

    // Find the course
    const courseData = attendanceData.find(
      (course) => course.course_name.toLowerCase() === courseName?.toLowerCase()
    );

    // Find the specific session
    const session = courseData?.sessions.find(
      (sess) => sess.session_number === sessionNum
    );

    return session;
  }, [attendanceData, courseName, sessionNumber]);

  // If no session data, show a message
  if (!sessionData) {
    return (
      <div className="text-white text-lg p-4">
        No student data available for this session
      </div>
    );
  }

  // Compute attendance summary
  const totalStudents = sessionData.students.length;
  const presentStudents = sessionData.students.filter(
    (student) => student.attendance_status
  ).length;
  const absentStudents = totalStudents - presentStudents;

  return (
    <>
      {/* Attendance Summary */}
      <div className="grid grid-cols-[1fr_3fr] p-4 px-8 gap-x-10 rounded-lg">
        <h2 className="text-[#3ECF8E] text-[25px] flex items-center">
          Attendance Summary
        </h2>
        <div className="flex justify-between px-8">
          <div className="flex flex-col justify-start">
            <p className="text-white text-lg">Total Students</p>
            <p className="text-[#3ECF8E] text-3xl">{totalStudents}</p>
          </div>
          <div className="flex flex-col justify-start">
            <p className="text-white text-lg">Present</p>
            <p className="text-[#3ECF8E] text-3xl">{presentStudents}</p>
          </div>
          <div className="flex flex-col justify-start">
            <p className="text-white text-lg">Absent</p>
            <p className="text-[#3ECF8E] text-3xl">{absentStudents}</p>
          </div>
        </div>
      </div>

      {/* Student List */}
      <div className="flex flex-col p-8 gap-4">
        {sessionData.students.map((student) => (
          <div
            key={student.StudentID}
            className="flex justify-between items-center font-bold text-lg text-white"
          >
            <div className="flex gap-x-4">
              <div>{student.StudentID}</div>
              <div>{student.student_name}</div>
              <div>{student.attendance_status ? "Present" : "Absent"}</div>
            </div>
            <div className="flex gap-x-4">
              <div className="text-white text-base">No Comments</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TeacherAttendanceView;
