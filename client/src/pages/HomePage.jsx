import RightLeftContainer from "../component/RightLeftContainer";
import Sidebar from "../component/Sidebar";
import { AttendanceProvider } from "../contexts/AttendanceContext";
import { SchoolProvider } from "../contexts/SchoolContext";
import { Outlet } from "react-router-dom";

function HomePage() {
  return (
    <SchoolProvider>
      <AttendanceProvider>
        <div className="flex h-screen bg-black">
          <Sidebar />
          <RightLeftContainer>
            <Outlet />
          </RightLeftContainer>
        </div>
      </AttendanceProvider>
    </SchoolProvider>
  );
}

export default HomePage;
