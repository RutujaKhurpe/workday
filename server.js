const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser');
require("dotenv").config()
const port = process.env.PORT;
const app = express();
const { WORKDAY_db, EMPLOYEE_db} = require('./db');

app.use(cors());
app.use(express.json()) //is middleware in an Express application,it parses incoming JSON data from requests and makes the parsed data available in req.body.
app.use(bodyParser.json()); // is middleware in an Express application.It parses incoming JSON data from requests and makes the parsed data available in req.body.
app.use(bodyParser.urlencoded({ extended: true })); //is middleware in an Express application.It parses incoming URL-encoded form data (such as data from HTML forms) and makes the parsed data available in req.body.


//accessing the middlewares / routes
const userRoutes = require('./routes/users/users')(WORKDAY_db); //It suggests that the imported module exports a function (or a factory function) that accepts an argument.
const departmentRoutes = require('./routes/employee_manage/department')(EMPLOYEE_db);
const CandidateSignupRoutes = require('./routes/candidates/singup') (WORKDAY_db);
const candidateApplicationRoutes = require('./routes/candidates/applications')(WORKDAY_db);


app.use(userRoutes);
app.use(departmentRoutes);
app.use(CandidateSignupRoutes);
app.use(candidateApplicationRoutes);

//check weather the user databse connected
WORKDAY_db.connect((err) => {
    if (err) {
        console.log("there is error connecting to workday database", err)
    } else {
        console.log("workday connected done!!")
    }
})
//check of employee database connected
EMPLOYEE_db.connect((err) => {
    if (err) {
        console.log("error connecting to database employee")
    } else {
        console.log("employee connected done")
    }
})
//check of application database connected?


// app.use((req,res,next)=>{
//     req.requestTime = new Date().toISOString();
//    // console.log(req.headers)
//     next();
// })
app.get('/', (req, res) => {
    res.send({ message: 'type' })
})


app.listen(port, () => {
    console.log(`server port ${port} running`)
})