drop database school;
create database school;
use school;

CREATE TABLE Classrooms (
  ClassroomID int primary key auto_increment not null unique,
  room_number varchar(50) not null
);

CREATE TABLE Courses (
  CourseID int primary key auto_increment not null unique,
  course_name varchar(50) not null
);

CREATE TABLE Teachers (
  TeacherID int primary key auto_increment unique not null,
  first_name varchar(50) not null,
  last_name varchar(50) not null,
  dath_of_birth date not null,
  address varchar(50),
  phone_number int not null
);

CREATE TABLE TeacherCourseAssignment(
	TeacherCourseID int primary key auto_increment unique not null,
    TeacherID int not null,
    CourseID int not null,
    foreign key (TeacherID) references Teachers(TeacherID),
    foreign key (CourseID) references Courses(CourseID)
);

CREATE TABLE Class(
	ClassID int primary key auto_increment unique not null,
    class_name VARCHAR(5) not null,
    ClassroomID INT not null,
    TeacherID int not null,
    FOREIGN KEY (ClassroomID) REFERENCES Classrooms(ClassroomID),
    foreign key (TeacherID) references Teachers(TeacherID)
);

create table Students (
	StudentID int primary key not null auto_increment unique, 
    ClassID int not null,
	first_name varchar(50) not null,
	last_name varchar(50) not null,
	date_of_birth date not null,
	address varchar(50),
	phone_number int,
    foreign key (ClassID) references Class(ClassID)
);

CREATE TABLE ClassSchedule (
	ScheduleID int primary key auto_increment unique not null,
    ClassID int not null,
    TeacherCourseID int not null,
    day_of_week VARCHAR(50) not null,
    start_time time not null,
    end_time time not null,
    foreign key (ClassID) references Class(ClassID),
    foreign key (TeacherCourseID) references TeacherCourseAssignment(TeacherCourseID)
);

CREATE TABLE Sessions (
	SessionID int primary key auto_increment unique not null,
    ScheduleID int not null,
    session_number int not null,
    foreign key (ScheduleID) references ClassSchedule(ScheduleID)
);

CREATE TABLE Attendance (
  StudentID int not null,
  SessionID int not null,
  attendance_status boolean not null,
  comments varchar(255),
  PRIMARY KEY (StudentID, SessionID),
  FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
  FOREIGN KEY (SessionID) REFERENCES Sessions(SessionID)
);

Create Table student_credentials (
	StudentID int not null,
	foreign key (StudentID) references students(StudentID),
    student_email varchar(50) not null,
    student_password varchar(50) not null,
    PRIMARY KEY (StudentID, student_email)
);

Create Table teacher_credentials (
	TeacherID int not null,
	foreign key (TeacherID) references teachers(TeacherID),
    teacher_email varchar(50) not null,
    teacher_password varchar(50) not null,
    PRIMARY KEY (TeacherID, teacher_email)
);

/* 
---------------------------------------
INSERT VALUES TO TABLE ----------------
---------------------------------------
*/

INSERT INTO Teachers (first_name, last_name, dath_of_birth, address, phone_number)
VALUES
('John', 'Doe', '1985-06-15', '123 Maple Street', 0234567890),
('Jane', 'Smith', '1990-03-22', '456 Oak Avenue', 0876543210),
('Michael', 'Brown', '1978-11-09', '789 Pine Road', 0555555555),
('Emily', 'Davis', '1992-08-14', '321 Elm Street', 0444444444),
('Chris', 'Wilson', '1983-12-25', '654 Spruce Lane', 0333333333),
('Sarah', 'Johnson', '1987-04-10', '987 Cedar Court', 0222222222),
('Daniel', 'White', '1975-09-30', '111 Birch Boulevard', 0111111111);

INSERT INTO Classrooms (room_number)
VALUES
('H-100'),
('H-101');

INSERT INTO Class(TeacherID, class_name, ClassroomID)
VALUES
(1, "10A", 1);

INSERT INTO Students (ClassID, first_name, last_name, date_of_birth, address, phone_number)
VALUES
(1, 'Alice', 'Johnson', '2010-02-15', '123 Maple Street', 0123456789),
(1, 'Bob', 'Smith', '2010-03-10', '456 Oak Avenue', 0987654321),
(1, 'Charlie', 'Brown', '2010-04-25', '789 Pine Road', 0555555555),
(1, 'Diana', 'Davis', '2010-05-14', '321 Elm Street', 0444444444),
(1, 'Eve', 'Wilson', '2010-06-07', '654 Spruce Lane', 0333333333),
(1, 'Frank', 'White', '2010-07-20', '987 Cedar Court', 0222222222),
(1, 'Grace', 'Harris', '2010-08-05', '111 Birch Boulevard', 0111111111),
(1, 'Hank', 'Jones', '2010-09-18', '202 Oak Circle', 0112233445),
(1, 'Ivy', 'Taylor', '2010-10-12', '303 Maple Lane', 0667788990),
(1, 'Jack', 'Martinez', '2010-11-03', '404 Spruce Avenue', 0778899001),
(1, 'Karen', 'Garcia', '2010-12-22', '505 Pine Street', 0889900112),
(1, 'Leo', 'Clark', '2010-01-30', '606 Cedar Road', 0990011223),
(1, 'Mia', 'Rodriguez', '2010-02-25', '707 Elm Boulevard', 0101112131),
(1, 'Nate', 'Walker', '2010-03-13', '808 Birch Avenue', 0121314151),
(1, 'Olivia', 'Anderson', '2010-04-08', '909 Oak Street', 0131415161),
(1, 'Paul', 'Moore', '2010-05-18', '101 Maple Avenue', 0141516171),
(1, 'Quinn', 'Adams', '2010-06-27', '202 Cedar Lane', 0151617181),
(1, 'Riley', 'Hill', '2010-07-06', '303 Pine Boulevard', 0161718191),
(1, 'Sophia', 'Scott', '2010-08-19', '404 Spruce Court', 0171819201),
(1, 'Tom', 'Green', '2010-09-25', '505 Elm Lane', 0181920211);

INSERT INTO student_credentials (StudentId, student_email, student_password)
VALUES
(1, 'alicejohnson@school.ac.id', 'password123'),
(2, 'bobsmith@school.ac.id', 'password123'),
(3, 'charliebrown@school.ac.id', 'password123'),
(4, 'dianadavis@school.ac.id', 'password123'),
(5, 'evewilson@school.ac.id', 'password123'),
(6, 'frankwhite@school.ac.id', 'password123'),
(7, 'graceharris@school.ac.id', 'password123'),
(8, 'hankjones@school.ac.id', 'password123'),
(9, 'ivytaylor@school.ac.id', 'password123'),
(10, 'jackmartinez@school.ac.id', 'password123'),
(11, 'karengarcia@school.ac.id', 'password123'),
(12, 'leoclark@school.ac.id', 'password123'),
(13, 'miarodriguez@school.ac.id', 'password123'),
(14, 'natewalker@school.ac.id', 'password123'),
(15, 'oliviaanderson@school.ac.id', 'password123'),
(16, 'paulmoore@school.ac.id', 'password123'),
(17, 'quinnadams@school.ac.id', 'password123'),
(18, 'rileyhill@school.ac.id', 'password123'),
(19, 'sophiascott@school.ac.id', 'password123'),
(20, 'tomgreen@school.ac.id', 'password123');

INSERT INTO teacher_credentials (TeacherID, teacher_email, teacher_password)
VALUES
(1, 'johndoe@school.ac.id', 'teachpass123'),
(2, 'janesmith@school.ac.id', 'teachpass123'),
(3, 'michaelbrown@school.ac.id', 'teachpass123'),
(4, 'emilydavis@school.ac.id', 'teachpass123'),
(5, 'chriswilson@school.ac.id', 'teachpass123'),
(6, 'sarahjohnson@school.ac.id', 'teachpass123'),
(7, 'danielwhite@school.ac.id', 'teachpass123');

INSERT INTO Courses (course_name)
VALUES
('Biology'),
('Chemistry'),
('Physics'),
('Mathematics'),
('English'),
('Bahasa Indonesia'),
('Social Studies');

INSERT INTO TeacherCourseAssignment (TeacherID, CourseID)
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7);

INSERT INTO ClassSchedule (ClassID, TeacherCourseID, day_of_week, start_time, end_time)
VALUES
(1, 1, 'Monday', '08:00', '09:00'),
(1, 1, 'Monday', '09:00', '10:00'),
(1, 5, 'Monday', '10:00', '11:00'),
(1, 3, 'Monday', '11:00', '12:00'),
(1, 7, 'Monday', '13:00', '14:00'),

(1, 5,'Tuesday', '08:00', '09:00'),		
(1, 3, 'Tuesday', '09:00', '10:00'),
(1, 3, 'Tuesday', '10:00', '11:00'),
(1, 4, 'Tuesday', '11:00', '12:00'),
(1, 2, 'Tuesday', '13:00', '14:00'),

(1, 1, 'Wednesday', '08:00', '09:00'),
(1, 1, 'Wednesday', '09:00', '10:00'),
(1, 4, 'Wednesday', '10:00', '11:00'),
(1, 2, 'Wednesday', '11:00', '12:00'),
(1, 2, 'Wednesday', '13:00', '14:00'),

(1, 6, 'Thursday', '08:00', '09:00'),
(1, 4, 'Thursday', '09:00', '10:00'),
(1, 4, 'Thursday', '10:00', '11:00'),
(1, 3, 'Thursday', '11:00', '12:00'),
(1, 2, 'Thursday', '13:00', '14:00'),

(1, 6, 'Friday', '08:00', '09:00'),
(1, 5, 'Friday', '09:00', '10:00'),
(1, 5, 'Friday', '10:00', '11:00');

INSERT INTO Sessions (ScheduleID, session_number)
VALUES
-- Monday (Course 1 - TeacherCourseID 1)
(1, 1), (2, 2),
-- Monday (Course 5 - TeacherCourseID 5)
(3, 1),
-- Monday (Course 3 - TeacherCourseID 3)
(4, 1),
-- Monday (Course 7 - TeacherCourseID 7)
(5, 1),

-- Tuesday (Course 5 - TeacherCourseID 5)
(6, 2),
-- Tuesday (Course 3 - TeacherCourseID 3)
(7, 2), (8, 3),
-- Tuesday (Course 4 - TeacherCourseID 4)
(9, 1),
-- Tuesday (Course 2 - TeacherCourseID 2)
(10, 1),

-- Wednesday (Course 1 - TeacherCourseID 1)
(11, 3), (12, 4),
-- Wednesday (Course 4 - TeacherCourseID 4)
(13, 2),
-- Wednesday (Course 2 - TeacherCourseID 2)
(14, 2), (15, 3),

-- Thursday (Course 6 - TeacherCourseID 6)
(16, 1),
-- Thursday (Course 4 - TeacherCourseID 4)
(17, 3), (18, 4),
-- Thursday (Course 3 - TeacherCourseID 3)
(19, 4),
-- Thursday (Course 2 - TeacherCourseID 2)
(20, 4),

-- Friday (Course 6 - TeacherCourseID 6)
(21, 2),
-- Friday (Course 5 - TeacherCourseID 5)
(22, 3), (23, 4);

-- Week 2 sessions
INSERT INTO Sessions (ScheduleID, session_number)
VALUES
-- Monday (Course 1 - TeacherCourseID 1)
(1, 5), (2, 6),
-- Monday (Course 5 - TeacherCourseID 5)
(3, 5),
-- Monday (Course 3 - TeacherCourseID 3)
(4, 5),
-- Monday (Course 7 - TeacherCourseID 7)
(5, 2),

-- Tuesday (Course 5 - TeacherCourseID 5)
(6, 6),
-- Tuesday (Course 3 - TeacherCourseID 3)
(7, 6), (8, 7),
-- Tuesday (Course 4 - TeacherCourseID 4)
(9, 5),
-- Tuesday (Course 2 - TeacherCourseID 2)
(10, 5),

-- Wednesday (Course 1 - TeacherCourseID 1)
(11, 7), (12, 8),
-- Wednesday (Course 4 - TeacherCourseID 4)
(13, 6),
-- Wednesday (Course 2 - TeacherCourseID 2)
(14, 6), (15, 7),

-- Thursday (Course 6 - TeacherCourseID 6)
(16, 3),
-- Thursday (Course 4 - TeacherCourseID 4)
(17, 7), (18, 8),
-- Thursday (Course 3 - TeacherCourseID 3)
(19, 8),
-- Thursday (Course 2 - TeacherCourseID 2)
(20, 8),

-- Friday (Course 6 - TeacherCourseID 6)
(21, 4),
-- Friday (Course 5 - TeacherCourseID 5)
(22, 7), (23, 8);
