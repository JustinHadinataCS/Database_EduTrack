import "./style.css";
import HomePage from "./pages/HomePage";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Error from "./component/Error";
import HomeScreen from "./pages/HomeScreen";
import ClassContainer from "./pages/ClassContainer";
import CourseContainer from "./pages/CourseContainer";
import AttendanceContainer from "./pages/AttendanceContainer.jsx";
import ScheduleContainer from "./pages/ScheduleContainer.jsx";
import Login from "./pages/login.jsx";
import SessionList from "./component/SessionList.jsx";
import TeacherAttendanceContainer from "./pages/TeacherAttendanceContainer.jsx";
import TeacherAttendanceView from "./pages/TeacherAttendanceView.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/login" replace />, // Redirect to /login
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <Error />,
    },
    {
      path: "/",
      element: <HomePage />,
      errorElement: <Error />,
      children: [
        { path: "dashboard", element: <HomeScreen /> },
        { path: "class", element: <ClassContainer /> },
        { path: "course", element: <CourseContainer /> },
        {
          path: "attendance",
          element: <AttendanceContainer />,
          children: [
            {
              path: ":studentId/:courseName", // Existing student path
              element: <SessionList />,
            },
            {
              path: "teacher/:courseName/:sessionNumber", // Teacher path
              element: <SessionList />,
            },
          ],
        },
        { path: "schedule", element: <ScheduleContainer /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
