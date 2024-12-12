import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSchool } from "../contexts/SchoolContext";

const Dropdown = ({ attendanceData }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentCourseName, setCurrentCourseName] = useState(null);
  const { userData } = useSchool();

  // Extract course name from query parameters
  const pathSegments = window.location.pathname.split("/");
  const courseName = decodeURIComponent(pathSegments[3]);

  useEffect(() => {
    if (attendanceData && courseName) {
      const foundCourse = attendanceData.find(
        (c) => c.course_name.toLowerCase() === courseName.toLowerCase()
      );
      setCurrentCourseName(foundCourse || null); // Handle case if course is not found
    }
  }, [attendanceData, courseName]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCourseSelect = (selectedCourseName) => {
    const selectedCourse = attendanceData.find(
      (c) => c.course_name === selectedCourseName
    );
    setCurrentCourseName(selectedCourse);
    navigate(`/attendance/${userData.StudentID}/${selectedCourseName}`);
    setIsOpen(false); // Close dropdown after selection
  };

  if (!currentCourseName) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md hover:bg-[#585858] focus:outline-none bg-[#1d1d1d] text-[20px]"
      >
        {currentCourseName.course_name}
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
            <button
              key={index}
              onClick={() => handleCourseSelect(item.course_name)}
              className="block px-4 py-2 text-sm text-white hover:bg-[#616161] w-full text-left"
              role="menuitem"
            >
              {item.course_name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
