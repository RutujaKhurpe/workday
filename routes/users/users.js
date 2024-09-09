const express = require('express')
const router = express.Router();
require('dotenv').config()

const protect = require('../../Authorization/auth');

const { getAllUsers, InsertUsers, CheckLogin } = require('../../controllers/userController');


module.exports = (WORKDAY_db) => {
    router.get('User/registration', protect, getAllUsers(WORKDAY_db));

    //insert values in user
    router.post('/User/insertUsers', InsertUsers(WORKDAY_db))

    router.post('/User/login', CheckLogin(WORKDAY_db));


    return router;
}




