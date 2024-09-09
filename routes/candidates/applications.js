const express = require('express');
const multer = require('multer');
const router = express.Router();
require('dotenv').config();

const protect = require('../../Authorization/auth');
//const extractFullName = require('../../middleware/fullNameExtraction'); // path to your middleware
const {getAllApplications, handleAddApplication, getprofileData } = require('../../controllers/Candidate');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // specify the uploads directory
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // ensure unique filenames
  }
});

const upload = multer({ storage: storage });

module.exports = (WORKDAY_db) => {
    router.get('/candidate/getapplications',protect,getAllApplications(WORKDAY_db) );
 
//  router.post('candidate/:candidateId/application', protect, upload.single('resume'), (req,res) => {
//   req.body.candidateId = req.params.candidateId;
//   handleAddApplication(WORKDAY_db)(req,res)});

router.post('/candidate/:candidateId/application', protect, upload.single('resume'), (req, res) => {
  req.body.candidateId = req.params.candidateId;
  handleAddApplication(WORKDAY_db)(req, res);
});

router.get('/:candidateId/profilePage', protect, (req,res) =>{
  const {candidateId} = req.params;
  getprofileData(WORKDAY_db) (req,res,candidateId);
})
 
 
 
 return router;
};





// const express = require('express')
// const router = express.Router();
// require('dotenv').config()

// const protect = require('../../Authorization/auth');
// const {handleAddApplication } = require('../../controllers/candidateApplication')

// module.exports = (WORKDAY_db) => {
//     router.post("/candidate/application",handleAddApplication(WORKDAY_db));


//     return router;
    
// };

