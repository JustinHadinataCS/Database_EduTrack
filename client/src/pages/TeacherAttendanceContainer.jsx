import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAttendance } from "../contexts/AttendanceContext";
import TeacherDropdown from "./TeacherDropdown"; // Teacher-specific dropdown

const TeacherAttendanceContainer = () => {
  const { teacherId, courseName, sessionNumber } = useParams(); // Extract teacherId from URL
  const { attendanceData, fetchAttendanceData } = useAttendance();
  const [selectedSession, setSelectedSession] = useState("");
  const [example, setExample] = useState("");
  const [courseData, setCourseData] = useState(null);
  useEffect(() => {
    if (courseName && teacherId) {
      fetchAttendanceData(courseName, teacherId); // Fetch the data when the course or teacher changes
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

  const specificSession = attendanceData.filter(
    (session) => session.session_number === Number(sessionNumber)
  );
  console.log("Attendance Data");
  console.log(attendanceData);
  console.log("Not Attendance Data");

  console.log(specificSession);

  // Handle session selection
  const handleSessionSelect = (session) => setSelectedSession(session);

  const sessionData = courseData?.sessions?.find(
    (session) => session.session_number === selectedSession
  );

  const totalStudents = sessionData?.students?.length || 0;
  const totalPresent =
    sessionData?.students?.filter(
      (student) => student.attendance_status === true
    ).length || 0;
  const totalAbsent = totalStudents - totalPresent;

  return (
    <div className="flex flex-col gap-y-5 px-10 py-5">
      <h1 className="text-[#3ECF8E] text-[25px]">
        Teacher Attendance Management
      </h1>

      <div className="flex">
        <TeacherDropdown onSessionSelect={handleSessionSelect} />
      </div>

      {courseData && sessionData ? (
        <div className="grid grid-cols-[1fr_3fr] p-4 px-8 gap-x-10 rounded-lg bg-[#1d1d1d]">
          <h1 className="flex text-[#3ECF8E] text-[25px] items-center">
            Attendance Summary
          </h1>
          <div className="flex justify-between px-8">
            <div className="flex flex-col justify-start">
              <p className="text-white text-lg">Total Students</p>
              <p className="text-[#3ECF8E] text-3xl">{totalStudents}</p>
            </div>
            <div className="flex flex-col justify-start">
              <p className="text-white text-lg">Total Present</p>
              <p className="text-[#3ECF8E] text-3xl">{totalPresent}</p>
            </div>
            <div className="flex flex-col justify-start">
              <p className="text-white text-lg">Total Absent</p>
              <p className="text-[#3ECF8E] text-3xl">{totalAbsent}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-white text-lg">Please select a session</div>
      )}

      {sessionData ? (
        <div className="flex p-8 gap-x-10 rounded-lg bg-[#1d1d1d] flex-col">
          {sessionData.students?.map((student) => (
            <div
              key={student.StudentID}
              className="flex justify-between font-bold text-lg text-white"
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
      ) : (
        <div className="text-white text-lg">
          No student data available for this session
        </div>
      )}
    </div>
  );
};

export default TeacherAttendanceContainer;
