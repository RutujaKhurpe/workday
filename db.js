const mysql = require('mysql');
require('dotenv').config();

// Connect to Workday database
const WORKDAY_db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Connect to Employee database
const EMPLOYEE_db = mysql.createConnection({
    host: process.env.DB_HOST_EMPLOYEE,
    user: process.env.DB_USER_EMPLOYEE,
    password: process.env.DB_PASSWORD_EMPLOYEE,
    database: process.env.DB_DATABASE_EMPLOYEE
});

// Connect to Application database


// Export the database connections
module.exports = {
    WORKDAY_db,
    EMPLOYEE_db,
};
