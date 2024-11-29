import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const SchoolContext = createContext();

function SchoolProvider({ children }) {
  const [totals, setTotals] = useState({});
  const [attendance, setAttendance] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentRes, teacherRes, attendanceRes] = await Promise.all([
          axios.get("http://localhost:8800/students/total"),
          axios.get("http://localhost:8800/teachers/total"),
          axios.get("http://localhost:8800/attendance/overview"),
        ]);

        setTotals({
          totalStudents: studentRes.data,
          totalTeachers: teacherRes.data,
        });
        console.log(attendanceRes.data);
        setAttendance(attendanceRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);
  return (
    <SchoolContext.Provider value={{ totals, attendance }}>
      {children}
    </SchoolContext.Provider>
  );
}

function useSchool() {
  const context = useContext(SchoolContext);
  if (context === undefined)
    throw new Error("Context is used outside of provider!");
  return context;
}

export { SchoolProvider, useSchool };
