# EduTrack

This project is a React-based education tracking application. It utilizes a backend (Node.js with Express) to handle database interactions and provides a user-friendly interface for managing student data, courses, attendance, and grades.

## Project Overview

EduTrack is designed to streamline administrative tasks in an educational setting.  This application will allow for efficient tracking of student progress, automated reporting, and secure access control for administrators, teachers, and students.

## Technologies Used

* **Frontend:** React, MUI (Material-UI), Tailwind CSS, Axios for API requests
* **Backend:** Node.js, Express.js, MySQL for database interactions, Express-session for user sessions.


## File Project Structure
```
├─ .gitattributes
├─ .gitignore
├─ README.md
├─ backend
│  ├─ .gitignore
│  ├─ attendance.js
│  ├─ class.js
│  ├─ connection.js
│  ├─ course.js
│  ├─ dashboard.js
│  ├─ index.js
│  ├─ login copy.js
│  ├─ login.js
│  ├─ package-lock.json
│  ├─ package.json
│  └─ schedule.js
├─ client
│  ├─ .gitignore
│  ├─ README.md
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ favicon.ico
│  │  ├─ index.html
│  │  ├─ logo192.png
│  │  ├─ logo512.png
│  │  ├─ manifest.json
│  │  └─ robots.txt
│  ├─ src
│  │  ├─ App.js
│  │  ├─ component
│  │  │  ├─ CourseCard.jsx
│  │  │  ├─ Error.jsx
│  │  │  ├─ Header.jsx
│  │  │  ├─ LoginForm.jsx
│  │  │  ├─ MainTitle.jsx
│  │  │  ├─ RightLeftContainer.jsx
│  │  │  ├─ SessionDetail.jsx
│  │  │  ├─ SessionList.jsx
│  │  │  ├─ SideItem.jsx
│  │  │  ├─ Sidebar.jsx
│  │  │  ├─ StudentCard.jsx
│  │  │  └─ TotalCard.jsx
│  │  ├─ contexts
│  │  │  ├─ AttendanceContext.jsx
│  │  │  └─ SchoolContext.jsx
│  │  ├─ index.css
│  │  ├─ index.js
│  │  ├─ pages
│  │  │  ├─ Add.jsx
│  │  │  ├─ Attendance.jsx
│  │  │  ├─ AttendanceContainer copy.jsx
│  │  │  ├─ AttendanceContainer.jsx
│  │  │  ├─ Books.jsx
│  │  │  ├─ ClassContainer.jsx
│  │  │  ├─ CourseContainer.jsx
│  │  │  ├─ Dropdown copy.jsx
│  │  │  ├─ Dropdown.jsx
│  │  │  ├─ HomePage.jsx
│  │  │  ├─ HomeScreen.jsx
│  │  │  ├─ ScheduleContainer.jsx
│  │  │  ├─ TeacherAttendanceContainer copy.jsx
│  │  │  ├─ TeacherAttendanceContainer.jsx
│  │  │  ├─ TeacherAttendanceView.jsx
│  │  │  ├─ TeacherDropdown.jsx
│  │  │  ├─ Update.jsx
│  │  │  └─ login.jsx
│  │  └─ style.css
│  └─ tailwind.config.js
├─ package-lock.json
└─ package.json
```

## Setup Instructions

**Backend (Node.js):**

1.  **Install Dependencies:**
    ```bash
    cd backend
    npm install
    ```
2.  **Create Database:**  You'll need to create a MySQL database named `school` and set up the necessary tables (e.g., `student_credentials`, `students`, `teachers`, `class`, `ClassSchedule`, `TeacherCourseAssignment`, `Courses`).  Example SQL scripts for this are not included in this repository.
3.  **Configure Database Credentials:**  Add database credentials (host, user, password, database name) to `.env` in the backend folder.  
4.  **Start Backend:**
    ```bash
    nodemon index.js
    ```


**Frontend (React):**

1.  **Install Dependencies:**
    ```bash
    cd client
    npm install
    ```
2.  **Start Frontend:**
    ```bash
    npm start
    ```

This will start the development server for the frontend at `http://localhost:3000`.  The frontend will communicate with the backend on `http://localhost:8800`.

## Project Status

This project is currently in a development stage and demonstrates the basic structure for a CRUD (Create, Read, Update, Delete) application for student data.
