const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');



//this is to get all Users 
const getAllUsers = (WORKDAY_db) => (req, res) => {
  const query = 'SELECT * FROM users';
  WORKDAY_db.query(query, (err, result) => {
    if (err) {
      console.error("Error in fetching data", error);
      res.status(500).json({ message: "Error in fetching data" });
      return;
    }
    res.status(200).json(result);
  })
}


//this is to insert users to the database
const InsertUsers = (WORKDAY_db) => async (req, res) => {
  const { fullName, email, gender, role, password } = req.body;
  const created_at = new Date(); // Set the current date and time

  try {
    const hashedpassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO users (fullName, email, gender, role, password, created_at) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [fullName, email, gender, role, hashedpassword, created_at];

    WORKDAY_db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error inserting data', err);
        res.status(500).json({ error: 'Failed to insert data' });
        return;
      }
      res.status(200).json({ message: 'Inserted successfully' });
    })
  } catch (error) {
    console.log("error during signup", error);
    res.status(500).json({ error: "an unexpected error occured" })
  }

}


//this is to check the login credentials of user
const CheckLogin = (WORKDAY_db) => (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM users WHERE email = ?`;
  WORKDAY_db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Error fetching user data', err);
      res.status(500).json({ error: 'Failed to fetch user data' });
      return;
    }

    if (results.length === 0) {
      res.status(400).json({ error: 'Invalid email or password' });
      return;
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      res.status(400).json({ error: 'Invalid email or password' });
      return;
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    console.log(token);
    res.status(200).json({ message: 'Login successful', token });
  });
}

module.exports = {
  getAllUsers,
  InsertUsers,
  CheckLogin
}