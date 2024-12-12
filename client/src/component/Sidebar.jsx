import React, { useState } from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router-dom";
import MainTitle from "./MainTitle";
import SideItem from "./SideItem";
import { useSchool } from "../contexts/SchoolContext";
import { useAttendance } from "../contexts/AttendanceContext";
//fef

function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({
    top: 147,
    opacity: 1,
  });

  const { userData } = useSchool();
  const { attendanceData } = useAttendance();
  const navigate = useNavigate();

  if (!attendanceData || attendanceData.length === 0) {
    return <div>Loading...</div>;
  }
  const menuItems = [
    { icon: <DashboardIcon />, context: "Dashboard", path: "/dashboard" },
    { icon: <GroupsIcon />, context: "My Class", path: "/class" },
    { icon: <AutoStoriesIcon />, context: "Courses", path: "/course" },
    {
      icon: <PendingActionsIcon />,
      context: "Attendance",
      path: `/attendance/${userData.StudentID}/${attendanceData[0].course_name}`,
    },
    { icon: <CalendarMonthIcon />, context: "Schedule", path: "/schedule" },
  ];

  const handleItemClick = (index, event, path) => {
    setActiveIndex(index);

    // Calculate the position of the clicked item
    const clickedItem = event.currentTarget;
    const itemTop = clickedItem.offsetTop;

    // Update indicator position
    setIndicatorStyle({
      top: itemTop,
      opacity: 1,
    });
    navigate(path);
  };

  return (
    <div className="bg-[#010101] w-1/6 border-r text-white border-[#2e2e2e] flex flex-col relative">
      <MainTitle
        onClick={() => setActiveIndex(0)}
        setIndicatorStyle={() => setIndicatorStyle({ top: 147, opacity: 1 })}
      />

      <div
        className="absolute right-0 w-1 bg-[#3ECF8E] transition-all duration-300 ease-in-out"
        style={{
          top: `${indicatorStyle.top}px`,
          height: "48px",
          opacity: indicatorStyle.opacity,
        }}
      />

      {menuItems.map((item, index) => (
        <SideItem
          key={index}
          icon={item.icon}
          context={item.context}
          isActive={activeIndex === index}
          onClick={(event) => handleItemClick(index, event, item.path)}
        />
      ))}
    </div>
  );
}

export default Sidebar;
