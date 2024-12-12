import React, { useEffect, useState } from "react";
import { useSchool } from "../contexts/SchoolContext";
import Dropdown from "./Dropdown";
import { Outlet } from "react-router-dom";

const AttendanceContainer = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const { userData } = useSchool();

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
    <div className="flex flex-col gap-y-5 px-10 py-5">
      <div className="flex">
        <Dropdown attendanceData={attendanceData} userData={userData} />
      </div>
      <div className="flex p-4 px-8 gap-x-10 rounded-lg bg-[#1d1d1d]">
        <h1 className="flex text-[#3ECF8E] text-[25px] flex-col justify-center">
          Summary
        </h1>
        <div className="flex justify-between w-2/4">
          <div className="flex flex-col justify-start">
            <p className="text-white text-lg">Total Sessions</p>
            <p className="text-[#3ECF8E]">20</p>
          </div>
          <div className="flex flex-col justify-start">
            <p className="text-white text-lg">Total Sessions</p>
            <p className="text-[#3ECF8E]">20</p>
          </div>
          <div className="flex flex-col justify-start">
            <p className="text-white text-lg">Total Sessions</p>
            <p className="text-[#3ECF8E]">20</p>
          </div>
        </div>
      </div>
      <div className="flex bg-[#1d1d1d] flex-col rounded-lg">
        <Outlet context={{ attendanceData }} />
      </div>
    </div>
  );
};

export default AttendanceContainer;
