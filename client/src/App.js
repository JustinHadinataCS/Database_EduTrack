import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style.css";
import HomePage from "./pages/HomePage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./component/Error";
import HomeScreen from "./pages/HomeScreen";
import StudentContainer from "./pages/StudentContainer";
import CourseContainer from "./pages/CourseContainer";

function App() {
  const router = createBrowserRouter([
    {
      element: <HomePage />,
      errorElement: <Error />,
      children: [
        { path: "/", element: <HomeScreen /> },
        { path: "/student", element: <StudentContainer /> },
        { path: "/teacher", element: <StudentContainer /> },
        { path: "/course", element: <CourseContainer /> },
        { path: "/classroom", element: <StudentContainer /> },
        { path: "/grade", element: <StudentContainer /> },
        { path: "/attendance", element: <StudentContainer /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
