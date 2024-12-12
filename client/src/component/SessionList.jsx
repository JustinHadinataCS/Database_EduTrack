import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAttendance } from "../contexts/AttendanceContext";
import SessionDetail from "./SessionDetail";

function SessionList() {
  const { courseName } = useParams();
  const [session, setSession] = useState(null);
  const { attendanceData } = useAttendance();

  useEffect(() => {
    const foundCourse = attendanceData.find(
      (c) => c.course_name.toLowerCase() === courseName.toLowerCase()
    );
    setSession(foundCourse);
  }, [courseName, attendanceData]);

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div class="flex bg-[#1d1d1d] flex-col rounded-lg">
      <div className="flex text-white p-5 gap-x-5">
        <p>Session</p>
        <p>Attendance</p>
      </div>
      {attendanceData.map((item, index) => (
        <SessionDetail
          sessionNumber={item.session.session_number}
          attendanceStatus={item.session.attendance_status}
          key={index}
        />
      ))}
    </div>
  );
}

export default SessionList;
