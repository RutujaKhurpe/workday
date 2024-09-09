// const jwt = require("jsonwebtoken");


// const getAllApplications = (WORKDAY_db) => (req, res) => {
//     const query = 'SELECT * FROM candidate_application';
//     WORKDAY_db.query(query, (err, result) => {
//       if (err) {
//         console.error("Error in fetching candidate application data", err);
//         res.status(500).json({ message: "Error in fetching candidate application  data" });
//         return;
//       }
//       res.status(200).json(result);
//     })
//   }
  




// const handleAddApplication = (WORKDAY_db) => (req, res) => {
//     const { candidateId, fullName, contact, address, positionApplied, workExperience, currentRole, currentCompany, UniversityName, MajorDegree, fieldOfStudy, PassingYear, skills } = req.body;
//     const submitted_at = new Date();
//     const resumePath = req.file ? req.file.path : null; // get the path of the uploaded file
//     const query = "INSERT INTO candidate_application(candidateId, fullName, contact, address, positionApplied, workExperience, currentRole, currentCompany, UniversityName, MajorDegree, fieldOfStudy, PassingYear, resume, skills, submitted_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
//     const values = [candidateId, fullName, contact, address, positionApplied, workExperience, currentRole, currentCompany, UniversityName, MajorDegree, fieldOfStudy, PassingYear, resumePath, skills, submitted_at];

//     WORKDAY_db.query(query, values, (err, result) => {
//         if (err) {
//             console.error("Error inserting candidate's application", err);
//             return res.status(500).json({ error: "Failed to insert candidate application" });
//         }
//         res.status(200).json({ success: "Application submitted successfully" });
//     });
// }

// module.exports = {
//     getAllApplications,
//     handleAddApplication,
// };





