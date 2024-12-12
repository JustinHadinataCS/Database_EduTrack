import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import attendanceRoutes from "./attendance.js";
import loginRoutes from "./login.js";
import classRoutes from "./class.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.get("/", (req, res) => {
  res.json("Hello this is the backend");
});

app.use("/login", loginRoutes);
app.use("/class", classRoutes);
app.use("/attendance", attendanceRoutes);

app.listen(8800, () => {
  console.log("Connected to backend!");
});
