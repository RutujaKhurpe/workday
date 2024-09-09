const express = require('express')
const router = express.Router(); //reates an instance of an Express router.Think of it as a mini Express app that handles routes and middleware independently.
require('dotenv').config()

const protect = require('../../Authorization/auth');

const { getAllCandidates, InsertCandidates, CheckLogin } = require('../../controllers/Candidate');


module.exports = (WORKDAY_db) => {
    router.get('/candidates', protect, getAllCandidates(WORKDAY_db));
    router.post('/candidate/signup', InsertCandidates(WORKDAY_db))
    router.post('/candidate/login', CheckLogin(WORKDAY_db));

    //     Route Definition:
    //     router.get('/candidates', ...) sets up an HTTP GET route for the /candidates URL path.When a client makes a GET request to / candidates, this route will handle it.
    // Middleware Usage:protect is likely a middleware function (not shown here) that runs before handling the request.
    // Middleware can perform tasks like authentication, logging, or data validation.
    // Controller Function: getAllCandidates(WORKDAY_db) is the controller function that handles the actual logic for fetching and returning data.
    // It interacts with the WORKDAY_db(presumably a database) to retrieve candidate information.
    


    return router;
}




