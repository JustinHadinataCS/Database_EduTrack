import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useSchool } from "./SchoolContext";

const AttendanceContext = createContext();

function AttendanceProvider({ children }) {
  const [attendanceData, setAttendanceData] = useState([]);
  const { userData } = useSchool();

  // Fetch attendance data function
  const fetchAttendanceData = async (courseName, teacherId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/attendance/teacher/${courseName}/${teacherId}`
      );
      const data = await response.json();
      setAttendanceData(data);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  // Fetch attendance data based on user type
  useEffect(() => {
    const idParam =
      userData.usertype === "Student" ? userData.StudentID : userData.TeacherID;

    if (!idParam) {
      console.error("No ID available for fetching attendance");
      return;
    }

    const fetchAttendance = async () => {
      const response = await fetch(
        `http://localhost:8800/attendance?${userData.usertype.toLowerCase()}Id=${idParam}`,
        { method: "GET", credentials: "include" }
      );
      const data = await response.json();
      setAttendanceData(data);
    };

    fetchAttendance();
  }, [userData]);

  return (
    <AttendanceContext.Provider value={{ attendanceData, fetchAttendanceData }}>
      {children}
    </AttendanceContext.Provider>
  );
}

function useAttendance() {
  const context = useContext(AttendanceContext);
  if (context === undefined)
    throw new Error("Context is used outside of provider!");
  return context;
}

export { useAttendance, AttendanceProvider };
