import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SchoolContext = createContext();

function SchoolProvider({ children }) {
  const [userData, setUserdata] = useState({});
  const [classData, setClassData] = useState({});
  const [scheduleData, setScheduleData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching data from different APIs
        const [classDataRes, scheduleDataRes, courseDataRes, loginRes] =
          await Promise.all([
            axios.get("http://localhost:8800/class/data"),
            axios.get("http://localhost:8800/schedule/data"),
            axios.get("http://localhost:8800/course/data"),
            axios.get("http://localhost:8800/login"), // Fetch login info
          ]);

        if (loginRes.data.valid) {
          // Handle setting user data based on usertype (Student or Teacher)
          const userData = {
            firstname: loginRes.data.firstname,
            lastname: loginRes.data.lastname,
            usertype: loginRes.data.usertype,
            classID: loginRes.data.classID,
            // Conditionally set either StudentID or TeacherID
            ...(loginRes.data.usertype === "Student"
              ? { StudentID: loginRes.data.StudentID }
              : { TeacherID: loginRes.data.TeacherID }),
            SessionIDs: loginRes.data.SessionIDs,
          };

          setUserdata(userData);
        } else {
          navigate("/Login"); // Redirect to login if not valid
        }

        // Set the other data from APIs
        setScheduleData(scheduleDataRes.data);
        setClassData(classDataRes.data);
        setCourseData(courseDataRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [navigate]); // Add navigate to dependencies to prevent potential issues

  return (
    <SchoolContext.Provider
      value={{ classData, userData, scheduleData, courseData }}
    >
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
