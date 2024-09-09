const express = require('express')
const router = express.Router();
require('dotenv').config() 
 
 //this is inserting employee details in employee_manage
 router.get('./employeeDetails', (req, res) => {
    const query = 'SELECT * FROM employeeDetails';
    EMPLOYEE_db.query(query, (err, result) => {
        if (err) {
            console.error("error fectching employee details")
            res.status(500).json({ message: 'error fetching employee details' })
            res.end("error fetching data")
            return;
        }
        console.log(result)
        res.status(200).json(result)
    })
})


router.post('/insertEmployee', (req, res) => {
    const query = `Insert into employeeDetails (UserID, FullName, JobTitle, Department, EmploymentType, EmploymentStatus, HireDate, ContractEndDate, WorkLocation) values(?)`
    const values = [UserID, FullName, JobTitle, Department, EmploymentType, EmploymentStatus, HireDate, ContractEndDate, WorkLocation]
    EMPLOYEE_db.query(query, values, (err, resut) => {
        console.error("error inserting values", err);
        res.status(500).json({ error: "failed inserting values" })
    })
    res.status(200).json("sucessfulyy inserted values")
    console.log("sucessfully inserted")
})