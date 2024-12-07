import RightLeftContainer from "../component/RightLeftContainer";
import Sidebar from "../component/Sidebar";
import { SchoolProvider } from "../contexts/SchoolContext";
import { Outlet } from "react-router-dom";

function HomePage() {
  return (
    <SchoolProvider>
      <div className="flex h-screen bg-black">
        <Sidebar/>
        <RightLeftContainer>
          <Outlet />
        </RightLeftContainer>
      </div>
    </SchoolProvider>
  );
}

export default HomePage;
