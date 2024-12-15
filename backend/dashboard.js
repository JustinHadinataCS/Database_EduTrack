import express from "express";
import db from "./connection.js";

const router = express.Router();

router.get("/data/totalStudents", (req, res) => {
    
    const query = "SELECT COUNT(*) AS totalStudents FROM students";

    db.query(query, [], (err, totalStudentData) => {
        if (err) return res.json({ message: "Server Error" });
    
        if (totalStudentData.length > 0) {
            return res.json(totalStudentData[0].totalStudents);
        } else {
            return res.json({});
        }
        });
  });

router.get("/data/totalTeachers", (req, res) => {
    
    const query = "SELECT COUNT(*) AS totalTeachers FROM teachers";

    db.query(query, [], (err, totalTeacherData) => {
        if (err) return res.json({ message: "Server Error" });
    
        if (totalTeacherData.length > 0) {
            return res.json(totalTeacherData[0].totalTeachers);
        } else {
            return res.json({});
        }
        });
  });
  
  export default router;
  