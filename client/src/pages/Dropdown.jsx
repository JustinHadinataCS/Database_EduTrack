import React, { useEffect, useState } from "react";
import { useAttendance } from "../contexts/AttendanceContext";
import { Link, Navigate } from "react-router-dom";
import { useSchool } from "../contexts/SchoolContext";

const Dropdown = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const { attendanceData } = useAttendance();
  const { userData } = useSchool();

  useEffect(() => {
    setCourses(attendanceData);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCourseSelect = (courseName) => {
    Navigate(`/attendance/${userData.StudentID}/${courseName}`);
  };
  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md hover:bg-[#585858] focus:outline-none bg-[#1d1d1d] text-[20px]"
      >
        {children}
        <svg
          className="w-5 h-5 ml-2 -mr-1"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 z-10 mt-2 min-w-max origin-top-right rounded-md bg-[#525252] shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-300 transform ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        style={{ left: "0", right: "auto" }}
      >
        <div
          className="py-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          {attendanceData.map((item, index) => (
            <Link
              key={index}
              onClick={() => handleCourseSelect(item.course_name)}
              className="block px-4 py-2 text-sm text-white hover:bg-[#616161]"
              role="menuitem"
            >
              {item.course_name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
