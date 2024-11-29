import React, { useState } from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useNavigate } from "react-router-dom";
import MainTitle from "./MainTitle";
import SideItem from "./SideItem";

function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [indicatorStyle, setIndicatorStyle] = useState({
    top: 0,
    opacity: 0,
  });
  const navigate = useNavigate();

  const menuItems = [
    { icon: <GroupsIcon />, context: "Students", path: "/student" },
    { icon: <AccountCircleIcon />, context: "Teachers" },
    { icon: <AutoStoriesIcon />, context: "Courses", path: "/course" },
    { icon: <SchoolIcon />, context: "Classroom" },
    { icon: <EmojiEventsIcon />, context: "Grade" },
    { icon: <CalendarMonthIcon />, context: "Attendance" },
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
        onClick={() => setActiveIndex(null)}
        setIndicatorStyle={() => setIndicatorStyle({ top: 0, opacity: 0 })}
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
