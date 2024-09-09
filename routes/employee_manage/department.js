const express = require('express')
const router = express.Router();
require('dotenv').config()

const protect = require('../../Authorization/auth');

const { GetAllDepartment, InsertDepartment } = require('../../controllers/departController');

module.exports = (EMPLOYEE_db) => {
    //this is inserting employee details in employee_manage
    router.get('/employee/Department', protect, GetAllDepartment(EMPLOYEE_db))
        .post('/employee/insertDepartment', InsertDepartment(EMPLOYEE_db));

    return router;
}