import React, { useState, useEffect } from 'react';
import { useSchool } from "../contexts/SchoolContext";

function Schedule() {
  const [timeSlots, setTimeSlots] = useState([]);
  const { scheduleData } = useSchool();

  useEffect(() => {
    const startTime = '08:00';
    const endTime = '14:00';
    const timeIncrement = 30; // in minutes

    // Helper functions
    function timeToMinutes(timeStr) {
      const [hours, minutes] = timeStr.split(':').map(Number);
      return hours * 60 + minutes;
    }

    function minutesToTime(totalMinutes) {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }

    const slots = [];
    let currentMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);

    while (currentMinutes <= endMinutes) {
      slots.push(minutesToTime(currentMinutes));
      currentMinutes += timeIncrement;
    }

    setTimeSlots(slots);

    // Helper functions for row and column calculations.
    function calculateRowIndex(time, startTime, timeIncrement) {
      const [hours, minutes] = time.split(':').map(Number);
      const [startHours, startMinutes] = startTime.split(':').map(Number);
      const totalMinutes = (hours * 60 + minutes) - (startHours * 60 + startMinutes);
      console.log(totalMinutes);
      return Math.floor(totalMinutes / timeIncrement) + 1; // +1 for CSS grid line indexing
    }

    function calculateColumnIndex(day) {
      let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
/*       days = ['MON', 'TUE', 'WED', 'THU', 'FRI']; */
      return days.indexOf(day) + 1; // +1 for CSS grid line indexing
    }

    // Course data.
    const courseBlockContainer = document.querySelector('.course-blocks');
    const courses = scheduleData;


    // Generate course blocks.
    courses.forEach(course => {
      const startRow = calculateRowIndex(course.startTime, startTime, timeIncrement);
      const endRow = calculateRowIndex(course.endTime, startTime, timeIncrement);
      const columnIndex = calculateColumnIndex(course.day);

      const courseBlockElement = document.createElement('div');
      courseBlockElement.className = 'course-block';
      courseBlockElement.textContent = course.name;
      courseBlockElement.style.gridRow = `${startRow} / ${endRow}`;
      courseBlockElement.style.gridColumn = `${columnIndex} / ${columnIndex + 1}`;
      courseBlockElement.style.backgroundColor = '#3ECF8E';
      courseBlockElement.style.color = '#2e2e2e';
      courseBlockElement.id = course.name.replace(/\s+/g, '-').toLowerCase();

      courseBlockContainer.appendChild(courseBlockElement);
    });
  }, []);

  return (
    <div className="timetable-container">
      <div className="day-names text-center">
        <div className="border-x border-[#3d3d3d]">Monday</div>
        <div className="border-x border-[#3d3d3d]">Tuesday</div>
        <div className="border-x border-[#3d3d3d]">Wednesday</div>
        <div className="border-x border-[#3d3d3d]">Thursday</div>
        <div className="border-x border-[#3d3d3d]">Friday</div>
      </div>

      <div className="time-slots text-center">
        {timeSlots.map((slot, index) => (
          <div key={index} className="time-slot border-b border-[#3D3D3D]">{slot}</div>
        ))}
      </div>
      
      <div className="course-blocks"></div>
    </div>
  );
}

export default Schedule;
