import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SchoolContext = createContext();

function SchoolProvider({ children }) {
  const [userData, setUserdata] = useState({});
  const [classData, setClassData] = useState({});
  const [scheduleData, setScheduleData] = useState([]);
  const [courseData, setCourseData] = useState([])
  // const [attendance, setAttendance] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [classDataRes, scheduleDataRes, courseDataRes] = await Promise.all([
          axios.get("http://localhost:8800/class/data"),
          axios.get("http://localhost:8800/schedule/data"),
          axios.get("http://localhost:8800/course/data"),
          axios
            .get("http://localhost:8800/login")
            .then((res) => {
              if (res.data.valid) {
                setUserdata({
                  firstname: res.data.firstname,
                  lastname: res.data.lastname,
                  usertype: res.data.usertype,
                  StudentID: res.data.StudentID,
                });
              } else {
                navigate("/Login");
              }
            })
            .catch((err) => {
              console.log(err);
            }),
        ]);

        setScheduleData(scheduleDataRes.data);
        setClassData(classDataRes.data);
        setCourseData(courseDataRes.data)
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);
  return (
    <SchoolContext.Provider value={{ classData, userData, scheduleData, courseData }}>
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
