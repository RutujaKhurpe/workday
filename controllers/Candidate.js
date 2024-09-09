const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');



//this is to get all Users 
const getAllCandidates = (WORKDAY_db) => (req, res) => {
  const query = 'SELECT * FROM candidate_signup';
  WORKDAY_db.query(query, (err, result) => {
    if (err) {
      console.error("Error in fetching candidate data", err);
      res.status(500).json({ message: "Error in fetching candidate  data" });
      return;
    }
    res.status(200).json(result);
  })
}


//this is to insert users to the database
const InsertCandidates = (WORKDAY_db) => async (req, res) => {
  const { email, password } = req.body;
  const created_at = new Date(); // Set the current date and time

  try {

    //try if email exists
    const checkEmailQuery = 'Select * from candidate_signup WHERE email = ?';
    WORKDAY_db.query(checkEmailQuery, [email], async (err, results) => {
      if (err) {
        console.log("error checking email existence", err)
        return res.status(500).json({ error: "an unexpected error occured" })
      }
      if (results.length > 0) {
        return res.status(409).json({ error: 'Email already exists. please login' })
      }
      const hashedpassword = await bcrypt.hash(password, 10);
      const query = `INSERT INTO candidate_signup (email,  password, created_at) VALUES (?, ?, ?)`;
      const values = [email, hashedpassword, created_at];

      WORKDAY_db.query(query, values, (err, result) => {
        if (err) {
          console.error('Error inserting candidate data', err);
          res.status(500).json({ error: 'Failed to insert candidate data' });
          return;
        }
        const candidateId = result.insertId;
        res.status(200).json({ message: `Inserted candidate successfully , candidateId : ${candidateId}` });
      })
    })
  } catch (error) {
    console.log("error during signup", error);
    res.status(500).json({ error: "an unexpected error occured" })
  }

}
//this is to check the login credentials of user
const CheckLogin = (WORKDAY_db) => (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM candidate_signup WHERE email = ?`;
  WORKDAY_db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Error fetching candidate ', err);
      return res.status(500).json({ error: 'Failed to fetch candidate data' });
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Email does not exist. Please sign up.' });
      return;
    }
    const candidate = results[0];
    const isPasswordValid = await bcrypt.compare(password, candidate.password)
    if (!isPasswordValid) {
      res.status(400).json({ error: 'Invalid email or password' });
      return;
    }

    //check if the candidate has submitted the application
    const applicationQuery = `Select * from candidate_application where candidateId = ? `;
    WORKDAY_db.query(applicationQuery,[candidate.Id], (err,applicationResult)=>{
      if(err){
        console.error("error checking candidate application", err);
        return res.status(500).json({error :"failed to check the candidate application"})
      }
      const hasApplication = applicationResult.length > 0;
    
    const token = jwt.sign(
      {
        Id: candidate.Id,
        email: candidate.email,
        fullName: candidate.fullName
      }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    res.status(200).json({ 
      message: 'Login successful', 
      token,
       candidateId: candidate.Id ,
      hasApplication,
      candidateDetails : candidate,
      appliedJobs : applicationResult
    });
  });
})

}
// Function Definition:
// const CheckLogin = (WORKDAY_db) => (req, res) => { ... }
// This defines an arrow function called CheckLogin.
// It takes a single argument, WORKDAY_db, which presumably represents a database connection.
// Request Data Extraction:
// const { email, password } = req.body;
// This line extracts the email and password properties from the request body.
// These values are likely sent by the client during a login attempt.
// Database Query:
// const query = SELECT * FROM candidate_signup WHERE email = ?;
// The SQL query selects all columns from a table named candidate_signup where the email matches the provided email.
// The ? is a placeholder for the actual email value.
// Database Query Execution:
// WORKDAY_db.query(query, [email], async (err, results) => { ... }
// This executes the query using the WORKDAY_db connection.
// If successful, the results will contain the rows returned by the query.
// Error Handling and Response:
// If there’s an error during the query, it logs an error message and sends a 500 status response.
// If no candidate with the given email exists, it sends a 404 status response.
// If the password is invalid, it sends a 400 status response.
// Otherwise, it generates a JWT (JSON Web Token) containing relevant user information and sends a 200 status response with the token.
// JWT Creation:
// jwt.sign(...) creates a JWT with specified claims (user ID, email, full name).
// It signs the token using a secret key (process.env.JWT_SECRET) and sets an expiration time (process.env.JWT_EXPIRES_IN).
//this is to get all the applications


const getAllApplications = (WORKDAY_db) => (req, res) => {
  const query = 'SELECT * FROM candidate_application';
  WORKDAY_db.query(query, (err, result) => {
    if (err) {
      console.error("Error in fetching candidate application data", err);
      res.status(500).json({ message: "Error in fetching candidate application  data" });
      return;
    }
    res.status(200).json(result);
  })
}
//this is to insert the application into the database
const handleAddApplication = (WORKDAY_db) => (req, res) => {
  const token = req.headers.authorization.split(' ')[1]; // Assuming the token is sent as a Bearer token
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const candidateId = decodedToken.Id;
  console.log('Received candidateId:', candidateId);
  const { fullName, contact, address, positionApplied, workExperience, currentRole, currentCompany, UniversityName, MajorDegree, fieldOfStudy, PassingYear, skills } = req.body;
  const submitted_at = new Date();
  const resumePath = req.file ? req.file.path : null; // get the path of the uploaded file
  const query = "INSERT INTO candidate_application(candidateId, fullName, contact, address, positionApplied, workExperience, currentRole, currentCompany, UniversityName, MajorDegree, fieldOfStudy, PassingYear, resume, skills, submitted_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [candidateId, fullName, contact, address, positionApplied, workExperience, currentRole, currentCompany, UniversityName, MajorDegree, fieldOfStudy, PassingYear, resumePath, skills, submitted_at];
  WORKDAY_db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error inserting candidate's application", err);
      return res.status(500).json({ error: "Failed to insert candidate application" });
    }
    res.status(200).json({ success: "Application submitted successfully" });
  });
}


const getprofileData = (WORKDAY_db) => (req,res,candidateId)=>{
  const query = `SELECT candidate_signup.email, candidate_application.*
    FROM candidate_signup
    JOIN candidate_application ON candidate_signup.Id = candidate_application.candidateId
    WHERE candidate_signup.Id = ?;`;
    WORKDAY_db.query(query,[candidateId], (err,result)=>{
      if(err){
        console.error("error fetching candidate data");
        return res.status(500).json({error :"failed to fetch candidate profie"})
      }
      if (result.length === 0){
        return res.status(404).json({error:"candidate not found"})
      }
      res.status(200).json(result);
    })

}

module.exports = {
  getAllApplications,
  handleAddApplication,
  getAllCandidates,
  InsertCandidates,
  getprofileData,
  CheckLogin
}