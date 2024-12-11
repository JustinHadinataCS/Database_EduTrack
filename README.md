# EduTrack

This project is a React-based education tracking application. It utilizes a backend (Node.js with Express) to handle database interactions and provides a user-friendly interface for managing student data, courses, attendance, and grades.

## Project Overview

EduTrack is designed to streamline administrative tasks in an educational setting.  This application will allow for efficient tracking of student progress, automated reporting, and secure access control for administrators, teachers, and students.

## Technologies Used

* **Frontend:** React, MUI (Material-UI), Tailwind CSS, Axios for API requests
* **Backend:** Node.js, Express.js, MySQL for database interactions, Express-session for user sessions.


## Project Structure

The project is organized into two primary directories:

* **client:** Contains the React frontend application.
    * `src/`: Source code for the React components, styles (Tailwind), and utilities.
    * `public/`: Contains static assets like images and index.html.
* **backend:** Contains the Node.js backend application.
    * `index.js`: Main entry point of the backend.
    *  Database files (`school.sql` or similar).


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
    npm start 
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
