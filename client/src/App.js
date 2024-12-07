import "./style.css";
import HomePage from "./pages/HomePage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./component/Error";
import HomeScreen from "./pages/HomeScreen";
import ClassContainer from "./pages/ClassContainer";
import CourseContainer from "./pages/CourseContainer";
import AttendanceContainer from "./pages/AttendanceContainer.jsx";
import Login from "./pages/login.jsx"

function App() {
  const router = createBrowserRouter([
    {
      element: <Login />,
      errorElement: <Error />,
      path: "/login"
    },

    {
      element: <HomePage />,
      errorElement: <Error />,
      children: [
        { path: "/dashboard", element: <HomeScreen /> },
        { path: "/class", element: <ClassContainer /> },
        { path: "/course", element: <CourseContainer /> },
        { path: "/attendance", element: <AttendanceContainer/> },
        {path: "/schedule", element:<AttendanceContainer/>}
      ],
    },
  ]);


  return <RouterProvider router={router} />;
}

export default App;
