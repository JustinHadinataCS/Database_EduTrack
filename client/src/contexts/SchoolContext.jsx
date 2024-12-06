import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const SchoolContext = createContext();

function SchoolProvider({ children }) {
  const [userData, setUserdata] = useState({});
  const [totals, setTotals] = useState({});
  const [attendance, setAttendance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentRes, teacherRes, attendanceRes] = await Promise.all([
          axios.get("http://localhost:8800/students/total"),
          axios.get("http://localhost:8800/teachers/total"),
          axios.get("http://localhost:8800/attendance/overview"),
          axios.get("http://localhost:8800/login")
          .then(res => {
            if(res.data.valid){
              setUserdata({
                firstname: res.data.firstname,
                lastname: res.data.lastname,
                usertype: res.data.usertype
              })
            } else {
              navigate('/Login');
            }
            
        })  
        .catch(err => {
            console.log(err)
        })
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
    <SchoolContext.Provider value={{ totals, attendance, userData}}>
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
