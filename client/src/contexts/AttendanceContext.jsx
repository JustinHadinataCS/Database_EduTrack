import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useSchool } from "./SchoolContext";

const AttendanceContext = createContext();

function AttendanceProvider({ children }) {
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
    <AttendanceContext.Provider value={{ attendanceData }}>
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
