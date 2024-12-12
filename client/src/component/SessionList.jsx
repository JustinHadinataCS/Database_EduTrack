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
      {filteredSessions.map((session, index) => (
        <div key={index} className="flex justify-between text-white px-5 py-2">
          <p>{session.session_number || `Session ${index + 1}`}</p>
          <p>{session.attendance_status ? "✅" : "❌"}</p>
        </div>
      ))}
    </div>
  );
}

export default SessionList;
