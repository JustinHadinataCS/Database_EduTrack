import React, { useEffect, useState } from "react";
import { useSchool } from "../contexts/SchoolContext";
import { useParams, Outlet } from "react-router-dom";
import Dropdown from "./Dropdown";
import TeacherDropdown from "./TeacherDropdown"; // Import the teacher-specific dropdown
import TeacherAttendanceContainer from "./TeacherAttendanceContainer";

const AttendanceContainer = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const { userData } = useSchool();
  const { courseName } = useParams(); // Get course name from URL

  const courseData = attendanceData.find(
    (course) => course.course_name.toLowerCase() === courseName?.toLowerCase()
  );

  const totalSessions = courseData?.sessions?.length || 0;
  const totalAttendance =
    courseData?.sessions?.filter((session) => session.attendance_status === 1)
      .length || 0;
  const totalAbsent = totalSessions - totalAttendance;

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        if (!userData || !userData.StudentID) {
          console.error("No student ID available");
          return;
        }

        const response = await fetch(
          `http://localhost:8800/attendance?studentId=${userData.StudentID}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const contentType = response.headers.get("content-type");
        if (!response.ok || !contentType?.includes("application/json")) {
          const errorText = await response.text();
          throw new Error(`Unexpected response: ${errorText}`);
        }

        const data = await response.json();
        setAttendanceData(data);
      } catch (error) {
        console.error("Error fetching attendance:", error.message);
      }
    };

    fetchAttendance();
  }, [userData]);

  const handleCourseSelect = (course) => {
    console.log("Selected Course:", course);
    // Handle the course selection logic here
  };

  const handleSessionSelect = (session) => {
    console.log("Selected Session:", session);
    // Handle the session selection logic here
  };

  const renderStudentUI = () => (
    <div className="flex flex-col gap-y-5 px-10 py-5">
      <div className="flex">
        <Dropdown attendanceData={attendanceData} userData={userData} />
      </div>

      <div className="grid grid-cols-[1fr_3fr] p-4 px-8 gap-x-10 rounded-lg bg-[#1d1d1d]">
        <h1 className="flex text-[#3ECF8E] text-[25px] items-center">
          Attendance Summary
        </h1>
        <div className="flex justify-between px-8">
          <div className="flex flex-col justify-start">
            <p className="text-white text-lg">Total Sessions</p>
            <p className="text-[#3ECF8E] text-3xl">{totalSessions}</p>
          </div>
          <div className="flex flex-col justify-start">
            <p className="text-white text-lg">Total Attendance</p>
            <p className="text-[#3ECF8E] text-3xl">{totalAttendance}</p>
          </div>
          <div className="flex flex-col justify-start">
            <p className="text-white text-lg">Not Attended</p>
            <p className="text-[#3ECF8E] text-3xl">{totalAbsent}</p>
          </div>
        </div>
      </div>

      <div className="flex bg-[#1d1d1d] flex-col rounded-lg">
        <Outlet context={{ attendanceData }} className="bg-red-500" />
      </div>
    </div>
  );

  const renderTeacherUI = () => <TeacherAttendanceContainer />;

  return userData?.usertype === "Teacher"
    ? renderTeacherUI()
    : renderStudentUI();
};

export default AttendanceContainer;
