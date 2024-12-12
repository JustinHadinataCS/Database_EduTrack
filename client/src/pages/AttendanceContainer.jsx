import React, { useEffect, useState } from "react";
import { useSchool } from "../contexts/SchoolContext";
import Dropdown from "./Dropdown";

const AttendanceContainer = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const { userData } = useSchool();
  console.log(attendanceData);

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

  return (
    <div class="flex flex-col gap-y-5 px-10 py-5">
      <div class="flex">
        {/* <Dropdown>Course</Dropdown> */}
      </div>
      <div class="flex p-4 px-8  gap-x-10 rounded-lg bg-[#1d1d1d]">
        <h1 className="flex text-[#3ECF8E] text-[25px] flex-col justify-center">
          Summary
        </h1>
        <div className="flex  justify-between w-2/4">
          {" "}
          <div className="flex flex-col justify-start">
            <p className="text-white text-lg">Total Session</p>
            <p className="text-[#3ECF8E]">20</p>
          </div>
          <div className="flex flex-col justify-start">
            <p className="text-white text-lg">Total Session</p>
            <p className="text-[#3ECF8E]">20</p>
          </div>
          <div className="flex flex-col justify-start">
            <p className="text-white text-lg">Total Session</p>
            <p className="text-[#3ECF8E]">20</p>
          </div>
        </div>
      </div>
      <div class="flex bg-[#1d1d1d] flex-col rounded-lg">
        <div className="flex text-white p-5 gap-x-5">
          <p>Session</p>
          <p>Attendance</p>
        </div>

        <div className="flex text-white px-5 justify-between py-2 gap-x-5 w-2/12">
          <p>Session 1</p>
          <div className="flex justify-start">
            <p>❌</p>
          </div>
        </div>
        <div className="flex text-white px-5 justify-between py-2 w-2/12 gap-x-5">
          <p>Session 2</p>
          <div className="flex justify-start">
            <p>✅</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceContainer;
