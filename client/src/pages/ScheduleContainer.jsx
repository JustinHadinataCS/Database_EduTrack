import React, { useEffect } from 'react';

function Schedule() {
  useEffect(() => {
        const timeSlotContainer = document.querySelector('.time-slots');
        const courseBlockContainer = document.querySelector('.course-blocks');
        const startTime = '08:00';
        const endTime = '19:00';
        const timeIncrement = 30; // in minutes

        let currentTime = new Date(`2000-01-01T${startTime}`);
        const endDateTime = new Date(`2000-01-01T${endTime}`);

        // Generate time slots dynamically.
        while (currentTime <= endDateTime) {
        const timeSlotElement = document.createElement('div');
        timeSlotElement.className = 'time-slot';
        timeSlotElement.textContent = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        timeSlotContainer.appendChild(timeSlotElement);

        currentTime = new Date(currentTime.getTime() + timeIncrement * 60000);
        }

    // Course data.
    const courses = [
      { name: 'Linear Algebra', startTime: '10:30', endTime: '12:10', day: 'MON', color: 'rgb(248, 242, 67)' },
      { name: 'Academic English', startTime: '13:30', endTime: '16:00', day: 'MON', color: 'rgb(151, 238, 151)' },
      { name: 'Data Structure Lab', startTime: '16:30', endTime: '18:10', day: 'MON', color: 'rgb(230, 144, 129)' },
      { name: 'Data Structure', startTime: '09:30', endTime: '11:10', day: 'TUE', color: 'rgb(88, 130, 154)' },
      { name: 'Data Structure', startTime: '11:30', endTime: '13:10', day: 'TUE', color: 'rgb(88, 130, 154)' },
      { name: 'Data Structure Lab', startTime: '15:30', endTime: '17:10', day: 'WED', color: 'rgb(86, 142, 91)' },
      { name: 'Object Oriented Programming', startTime: '09:30', endTime: '12:00', day: 'THU', color: 'rgb(231, 176, 104)' },
      { name: 'Project Hatchery', startTime: '13:30', endTime: '15:10', day: 'THU', color: 'rgb(240, 168, 232)' },
      { name: 'Calculus', startTime: '08:20', endTime: '09:40', day: 'FRI', color: 'rgb(239, 84, 84)' },
      { name: 'Calculus', startTime: '10:00', endTime: '11:40', day: 'FRI', color: 'rgb(239, 84, 84)' },
    ];

    // Generate course blocks.
    courses.forEach(course => {
      const startRow = calculateRowIndex(course.startTime, startTime, timeIncrement);
      const endRow = calculateRowIndex(course.endTime, startTime, timeIncrement) + 1;
      const columnIndex = calculateColumnIndex(course.day);

      const courseBlockElement = document.createElement('div');
      courseBlockElement.className = 'course-block';
      courseBlockElement.textContent = course.name;
      courseBlockElement.style.gridRow = `${startRow} / ${endRow}`;
      courseBlockElement.style.gridColumn = `${columnIndex} / ${columnIndex + 1}`;
      courseBlockElement.style.backgroundColor = course.color;
      courseBlockElement.id = course.name.replace(/\s+/g, '-').toLowerCase();

      courseBlockContainer.appendChild(courseBlockElement);
    });

    // Helper functions for row and column calculations.
    function calculateRowIndex(time, startTime, timeIncrement) {
      const [hours, minutes] = time.split(':').map(Number);
      const [startHours, startMinutes] = startTime.split(':').map(Number);
      const totalMinutes = (hours * 60 + minutes) - (startHours * 60 + startMinutes);
      return Math.floor(totalMinutes / timeIncrement) + 1; // +1 for CSS grid line indexing
    }

    function calculateColumnIndex(day) {
      const days = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
      return days.indexOf(day) + 1; // +1 for CSS grid line indexing
    }
  }, []);

  return (
    <div className="timetable-container">
      <div className="day-names">
        <div>MON</div>
        <div>TUE</div>
        <div>WED</div>
        <div>THU</div>
        <div>FRI</div>
      </div>
      <div className="time-slots"></div>
      <div className="course-blocks"></div>
    </div>
  );
}

export default Schedule;
