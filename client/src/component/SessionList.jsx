import React, { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";

function SessionList() {
  const { courseName } = useParams();
  const { attendanceData } = useOutletContext();
  const [filteredSessions, setFilteredSessions] = useState([]);

  useEffect(() => {
    if (!attendanceData || attendanceData.length === 0) {
      return;
    }

    const course = attendanceData.find(
      (item) => item.course_name.toLowerCase() === courseName.toLowerCase()
    );

    if (course && course.sessions) {
      setFilteredSessions(course.sessions);
    } else {
      setFilteredSessions([]);
    }
  }, [attendanceData, courseName]);

  if (filteredSessions.length === 0) {
    return <div>No sessions available for {courseName}</div>;
  }

  return (
    <div>
      <div className="flex text-white px-5 justify-between py-2 gap-x-5 w-2/12">
        <p>Session</p>
        <div className="flex justify-start">
          <p>Attendance</p>
        </div>
      </div>
      {filteredSessions.map((session, index) => (
        <div
          key={index}
          className="flex justify-between text-white px-5 py-2 w-2/12"
        >
          <div>
            <p>{session.session_number || `Session ${index + 1}`}</p>
          </div>
          <div className="flex justify-start">
            <p>{session.attendance_status ? "✅" : "❌"}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SessionList;
