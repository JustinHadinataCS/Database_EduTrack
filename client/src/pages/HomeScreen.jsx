import TotalCard from "../component/TotalCard";
import { useState, useEffect } from 'react';
import { useSchool } from "../contexts/SchoolContext";
import TodayIcon from '@mui/icons-material/Today';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PlaceIcon from '@mui/icons-material/Place';

function HomeScreen() {
  const { scheduleData } = useSchool();
  const [upcomingClass, setUpcomingClass] = useState(null);

  function getUpcomingClass(timetable) {
    const now = new Date();
    const currentDay = now.toLocaleString('en-US', { weekday: 'long' }); 
    const currentTime = now.getHours() * 60 + now.getMinutes(); 

    const timeToMinutes = (time) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };
  
    const todayClasses = timetable
      .filter(classItem => classItem.day === currentDay)
      .filter(classItem => timeToMinutes(classItem.startTime) > currentTime) 
      .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime)); 
  
    if (todayClasses.length > 0) {
      return todayClasses[0];
    }
  
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayIndex = daysOfWeek.indexOf(currentDay);
  
    const upcomingClasses = timetable.map(classItem => {
      const classDayIndex = daysOfWeek.indexOf(classItem.day);
      const daysUntilClass = (classDayIndex - currentDayIndex + 7) % 7;
      const classDate = new Date(now);
      classDate.setDate(now.getDate() + daysUntilClass);
      classDate.setHours(...classItem.startTime.split(':').map(Number)); 
      classDate.setMinutes(classItem.startTime.split(':')[1]);
      return { ...classItem, classDate };
    });
  
    let nextClass = upcomingClasses
      .filter(classItem => classItem.classDate > now) 
      .sort((a, b) => a.classDate - b.classDate)[0];
  
    return nextClass || null; 
  }

  useEffect(() => {
    if (scheduleData.length > 0) {
      const nextClass = getUpcomingClass(scheduleData);
      setUpcomingClass(nextClass);
    }
  }, [scheduleData]);

  if(!upcomingClass) {
    return (<div></div>);
  }

  return (
    <div>
      <div className="flex flex-wrap gap-1 xl:justify-between sm:justify-center px-20 py-10 m-auto max-w-[1300px]">
        <TotalCard count={0} label="Total Students"/>
        <TotalCard count={0} label="Total Teachers" />
        <TotalCard
          count={0}
          label="Present Students"
          extra="%"
        />
        <TotalCard
          count={0}
          label="Absent Students"
          extra="%"
        /> 
      </div>

      <div className="flex flex-wrap justify-between gap-2 xl:justify-between sm:justify-center px-20 py-10 m-auto max-w-[1300px]">
        <div className="flex flex-col w-[680px] h-[500px] bg-[#2e2e2e] rounded-xl">
          <h1 className="border-b border-[#565656] p-3 text-white text-2xl">Course Progress</h1>
          <div className="w-full h-full rounded-bl-xl rounded-br-xl overflow-y-scroll p-7">

          </div>
        </div>
        <div className="flex flex-col w-[380px] h-[500px] bg-[#2e2e2e] rounded-xl">
          <h1 className="border-b border-[#565656] p-3 text-white text-2xl">Upcoming Class</h1>
          <div className="flex flex-col gap-10 w-full h-full rounded-bl-xl rounded-br-xl p-7 text-white">
          {upcomingClass ? 
          <>            
            <h1 className="text-5xl font-semibold">{upcomingClass.name}</h1>
            <div className="flex items-center text-xl gap-3">
              <div className="rounded-full bg-[#3ECF8E] w-12 h-12 mr-2 flex items-center justify-center">
                <span className="text-[#121212] text-xl font-medium">
                  {upcomingClass.teacher_firstname[0]}
                  {upcomingClass.teacher_lastname[0]}
                </span>
              </div>
              <h1>{upcomingClass.teacher_firstname} {upcomingClass.teacher_lastname}</h1>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <TodayIcon/>{upcomingClass.day}
              </div>
              <div className="flex gap-2">
                <AccessTimeFilledIcon/>{upcomingClass.startTime} - {upcomingClass.endTime}
              </div>
              <div className="flex gap-2">
                <PlaceIcon/>{upcomingClass.classroom}
              </div>
            </div>
          </>: 
            <>Loading...</> 
          }

          </div>
        </div>
      </div>

    </div>
  );
}

export default HomeScreen;
