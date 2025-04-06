const express = require("express");
const app = express();
const authController = require("./controllers/authController");
const usersController = require("./controllers/usersController");
const adminRouter = require("./services/studentsService");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(adminRouter);

app.get("/login", authController.loginPage);
app.post("/login", authController.login);
app.get("/admin", usersController.adminPage);
app.get("/student", usersController.studentPage);

app.listen(3000, () => {
  console.log("Сервер працює на http://localhost:3000");
});
